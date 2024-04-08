"use client";
import { InfiniteScroll } from "@components/general/infiniteScroll";
import { User } from "@models/user.model";
import { Pagination } from "@models/utils.model";
import { userList } from "@services/user";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Contact, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

const Roles = {
  guest: "Convidado",
  admin: "Administrador",
  user: "Usuário",
};

interface Props {
  listInitial: Pagination<Omit<User, "password">>;
}

export const ListUsers: FC<Props> = ({ listInitial }) => {
  const queries = useSearchParams();

  const search = (queries.get("search") as string) ?? undefined;

  const { hasNextPage, isFetching, data, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["users", search],
    queryFn: async ({ pageParam = 0 }) =>
      await userList({ offset: pageParam, name: search }),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
    initialData: {
      pages: [listInitial],
      pageParams: [0],
    },
  });

  if (data?.pages?.[0]?.totalElements === 0)
    return <div>Nenhum usuário encontrado</div>;

  return (
    <InfiniteScroll
      onEndReached={() => {
        if (hasNextPage && !isFetching) fetchNextPage();
      }}
      className="flex flex-col gap-4"
    >
      {data?.pages?.map(
        (page) =>
          page?.content?.map((user) => (
            <div
              className="gap-1 rounded-md border border-solid border-gray-4 p-4"
              key={user._id}
              id={`user-${user._id}`}
            >
              <span className="line-clamp-1 pb-4 text-xl font-semibold text-gray-12">
                {user.name}
              </span>
              <div className="flex items-center gap-2 ">
                <Mail className="h-4 w-4" />
                <span className="line-clamp-1 text-sm text-gray-11">
                  {user.email}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Contact className="h-4 w-4" />
                <span className="line-clamp-1 text-sm text-gray-11">
                  {Roles[user.role] ?? "-"}
                </span>
              </div>
            </div>
          )),
      )}

      {isFetching &&
        Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-16 w-full animate-pulse gap-1 rounded-md border border-solid border-gray-4 p-4"
          />
        ))}
    </InfiniteScroll>
  );
};

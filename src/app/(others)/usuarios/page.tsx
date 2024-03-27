"use client";
import { InfiniteScroll } from "@components/general/infiniteScroll";
import { userList } from "@services/user";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Contact, Mail } from "lucide-react";

export default function Page() {
  const { hasNextPage, isPending, data, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["users"],
    queryFn: async ({ pageParam = 0 }) => await userList({ offset: pageParam }),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
  });

  if (data?.pages?.[0]?.totalElements === 0)
    return <div>Nenhum usuário encontrado</div>;

  return (
    <InfiniteScroll
      onEndReached={() => {
        if (hasNextPage && !isPending) fetchNextPage();
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
                  {user.role}
                </span>
              </div>
            </div>
          )),
      )}
    </InfiniteScroll>
  );
}

"use client";

import { InfiniteScroll } from "@components/general/infiniteScroll";
import { Structure } from "@models/structure.model";
import { Pagination } from "@models/utils.model";
import { getAllStructures } from "@services/structures";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FileDigit, FolderInput, UserSearch } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

interface Props {
  listInitial: Pagination<Structure>;
}

export const ListStructure: FC<Props> = ({ listInitial }) => {
  const queries = useSearchParams();
  const search = queries.get("search") ?? undefined;

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["structures", search],
    queryFn: async ({ pageParam }) =>
      getAllStructures({
        offset: pageParam,
        name: search,
      }),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
    initialData: {
      pages: [listInitial],
      pageParams: [0],
    },
  });

  if (data?.pages?.[0]?.totalElements === 0 && !isFetching)
    return <div>Nenhuma estrutura encontrada</div>;

  return (
    <InfiniteScroll
      onEndReached={() => {
        if (hasNextPage && !isFetching) fetchNextPage();
      }}
      className="flex flex-col gap-4"
    >
      {data.pages.map((page, i) =>
        page.content?.map((structure) => (
          <Link
            key={structure._id}
            className="gap-1 rounded-md border border-solid border-gray-4 p-4"
            href={`/estruturas/${structure._id}`}
            aria-label={`Visualizar estrutura ${structure.name}`}
            id={`structure-${structure._id}-link`}
          >
            <span className="line-clamp-1 pb-4 text-xl font-semibold text-gray-12">
              {structure.name}
            </span>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <FileDigit size={16} />
                <span className="line-clamp-1 text-sm text-gray-11">
                  Total de parâmetros de entrada: {structure.lengthParams ?? 0}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserSearch size={16} />
                <span className="text-sm text-gray-11">
                  Número de agentes: {structure.agents?.length ?? 0}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FolderInput size={16} />
                <span className="text-sm text-gray-11">
                  Pasta: {structure.folder}
                </span>
              </div>
            </div>
          </Link>
        )),
      )}

      {isFetching &&
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid animate-pulse gap-1 rounded-md border border-solid border-muted p-4"
          >
            <div className="h-4 w-1/2 rounded bg-muted"></div>
            <div className="mb-4 h-4 w-1/4 rounded bg-muted"></div>
            <div className="h-4 w-1/4 rounded bg-muted"></div>
            <div className="h-4 w-1/4 rounded bg-muted"></div>
          </div>
        ))}
    </InfiniteScroll>
  );
};

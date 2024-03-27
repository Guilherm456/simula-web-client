"use client";

import { InfiniteScroll } from "@components/general/infiniteScroll";
import { Structure } from "@models/structure.model";
import { Pagination } from "@models/utils.model";
import { getAllStructures } from "@services/structures";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

interface Props {
  listInitial: Pagination<Structure>;
}

export const ListStructure: FC<Props> = ({ listInitial }) => {
  const queries = useSearchParams();
  const search = queries.get("search") ?? "";

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 1,
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

  return (
    <InfiniteScroll
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      className="flex flex-col gap-4"
    ></InfiniteScroll>
  );
};

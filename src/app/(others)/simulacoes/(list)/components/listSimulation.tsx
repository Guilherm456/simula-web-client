"use client";

import { InfiniteScroll } from "@components/general/infiniteScroll";
import { Simulacao } from "@models/simulation.model";
import { Pagination } from "@models/utils.model";
import { getSimulations } from "@services/simulation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { simulationStatus } from "@utils/simulation";
import { cn } from "@utils/utils";
import dayjs from "dayjs";
import { CalendarClock, CalendarPlus, Tag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

interface Props {
  listInitial: Pagination<Simulacao>;
}

export const ListSimulations: FC<Props> = ({ listInitial }) => {
  const query = useSearchParams();

  const search = (query.get("search") as string) ?? "";
  const status = (query.get("status") as string) ?? "";

  const { hasNextPage, data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["simulations", search, status],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) =>
      await getSimulations({
        offset: pageParam,
        name: search,
        status: status,
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
        if (hasNextPage && !isFetching) fetchNextPage();
      }}
      className="flex flex-col gap-4"
    >
      {data?.pages?.map(
        (page) =>
          page?.content?.map((simulation) => (
            <Link
              key={simulation._id}
              className="gap-1 rounded-md border border-solid border-gray-4 p-4"
              href={`/simulacoes/${simulation._id}`}
              aria-label={`Visualizar base ${simulation.name}`}
              id={`base-${simulation._id}`}
            >
              <span className="line-clamp-1 text-xl font-semibold text-gray-12">
                {simulation.name}
              </span>
              <div className="flex items-center gap-2 pb-4">
                <Tag className="h-4 w-4" />
                <span
                  className={cn(
                    "line-clamp-1 text-sm",
                    simulationStatus[simulation.status].color,
                  )}
                >
                  {simulationStatus[simulation.status].label}
                </span>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <CalendarPlus className="h-4 w-4" />
                  <span className="text-sm text-gray-11">
                    {dayjs(simulation.createdAt).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" />
                  <span className="text-sm text-gray-11">
                    {simulation.updatedAt
                      ? dayjs(simulation.updatedAt).format("DD/MM/YYYY")
                      : "Não houve atualização"}
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

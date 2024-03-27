"use client";

import { getSimulations } from "@services/simulation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { simulationStatus } from "@utils/simulation";
import { cn } from "@utils/utils";
import dayjs from "dayjs";
import { CalendarClock, CalendarPlus, Tag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const query = useSearchParams();

  const search = (query.get("search") as string) ?? "";
  const status = (query.get("status") as string) ?? "";

  const { hasNextPage, data, isPending, fetchNextPage } = useInfiniteQuery({
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
  });
  return (
    <>
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
    </>
  );
}

"use client";
import { InfiniteScroll } from "@components/general/infiniteScroll";
import { getBases } from "@services/base";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { BuildingIcon, CalendarClock, CalendarPlus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const ListBases = () => {
  const queries = useSearchParams();

  const search = (queries.get("search") as string) ?? "";

  const {
    data: base,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["bases", search],
    queryFn: async ({ pageParam = 0 }) =>
      await getBases({
        offset: pageParam,
        name: search ?? undefined,
      }),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
  });
  return (
    <InfiniteScroll
      onEndReached={() => {
        if (hasNextPage && !isPending) fetchNextPage();
      }}
      className="flex flex-col gap-4"
    >
      {base?.pages?.map(
        (page) =>
          page?.content?.map((base) => (
            <Link
              key={base._id}
              className="gap-1 rounded-md border border-solid border-gray-4 p-4"
              href={`/base/${base._id}`}
              aria-label={`Visualizar base ${base.name}`}
              id={`base-${base._id}`}
            >
              <span className="line-clamp-1 text-xl font-semibold text-gray-12">
                {base.name}
              </span>
              <div className="flex items-center gap-2 pb-4">
                <BuildingIcon size={16} />
                <span className="line-clamp-1 text-sm text-gray-11">
                  {base.type?.name ?? "-"}
                </span>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <CalendarPlus size={16} />
                  <span className="text-sm text-gray-11">
                    {dayjs(base.createdAt).format("DD/MM/YYYY")}
                  </span>
                </div>
                {base.updatedAt && (
                  <div className="flex items-center gap-2">
                    <CalendarClock size={16} />
                    <span className="text-sm text-gray-11">
                      {dayjs(base.updatedAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          )),
      )}

      {isPending &&
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

"use client";
import { InfiniteScroll } from "@components/general/infiniteScroll";
import { Button, Textfield } from "@components/ui";
import { getBases } from "@services/base";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import {
  BuildingIcon,
  CalendarClock,
  CalendarPlus,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModalBase } from "./components/Modal/modalBase";

export default function Page() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const {
    data: base,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["bases", query],
    queryFn: async ({ pageParam = 0 }) =>
      await getBases({
        offset: pageParam,
        name: query ?? undefined,
      }),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
  });

  const handleSearch = debounce((value) => setQuery(value), 500);

  return (
    <div className="m-6 flex flex-col gap-5">
      <div className="sticky left-0 top-[4.25rem] z-10 flex flex-col gap-5 bg-white py-6 md:top-0">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-gray-12">Bases</h1>
          <Button className="w-max gap-2" onClick={() => setOpen(true)}>
            <Plus className="h-5 w-5 " />
            Criar base
          </Button>
        </div>
        <ModalBase open={open} onClose={() => setOpen(false)} />
        <Textfield
          placeholder="Pesquisar pelo nome"
          onChange={(e) => handleSearch(e.target.value)}
          rightIcon={
            <div className="rounded-full bg-blue-500 p-2">
              <Search className="h-5 w-5 text-gray-1" />
            </div>
          }
        />
      </div>

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
                href={`/bases/${base._id}`}
                aria-label={`Visualizar base ${base.name}`}
              >
                <span className="line-clamp-1 text-xl font-semibold text-gray-12">
                  {base.name}
                </span>
                <div className="flex items-center gap-2 pb-4">
                  <BuildingIcon className="h-4 w-4" />
                  <span className="line-clamp-1 text-sm text-gray-11">
                    {base.type?.name ?? "-"}
                  </span>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <CalendarPlus className="h-4 w-4" />
                    <span className="text-sm text-gray-11">
                      {dayjs(base.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                  {base.updatedAt && (
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4" />
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
    </div>
  );
}

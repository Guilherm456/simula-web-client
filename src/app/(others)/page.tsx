import { getBases } from "@services/base";
import { Metadata } from "next";
import { Suspense } from "react";
import { ButtonCreateBase } from "./components/buttonCreateBase";
import { ListBases } from "./components/listBases";
import { SearchInput } from "./components/searchInput";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const list = await getBases({
    name: searchParams["search"] as string,
  });

  return (
    <div className="m-6 flex flex-col gap-5">
      <div className="sticky left-0 top-0 z-10 flex flex-col gap-5 bg-white py-6 ">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-gray-12">Bases</h1>
          <ButtonCreateBase />
        </div>
        <Suspense
          fallback={<div className="h-14 w-full rounded-md bg-gray-4" />}
        >
          <SearchInput placeholder="Buscar bases por nome" />
        </Suspense>
      </div>

      <ListBases listInitial={list} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Bases - SIMULAWeb",
  description: "Bases utilizadas para a criação de novas simulações",
};

import { getAllStructures } from "@services/structures";
import { Metadata } from "next";
import { Suspense } from "react";
import { SearchInput } from "../components/searchInput";
import { ButtonCreateStructure } from "./components/buttonCreateStructure";
import { ListStructure } from "./components/listStructure";

export default async function Page({ searchParams }) {
  const list = await getAllStructures({
    name: searchParams["search"] as string,
  });
  return (
    <div className="m-6 flex flex-col gap-5">
      <div className="sticky left-0 top-[4.25rem] z-10 flex flex-col gap-5 bg-white py-6 md:top-0">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-gray-12">Estruturas</h1>
          <ButtonCreateStructure />
        </div>
        <Suspense
          fallback={<div className="h-14 w-full rounded-md bg-gray-4" />}
        >
          <SearchInput placeholder="Buscar estruturas por nome" />
        </Suspense>
      </div>

      <ListStructure listInitial={list} />
      {/* <ListBases /> */}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Estruturas - SIMULAWeb",
  description: "Estruturas das doenças disponíveis no sistema",
};

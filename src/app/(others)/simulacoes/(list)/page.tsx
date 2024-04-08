import { getSimulations } from "@services/simulation";
import { Metadata } from "next";
import { Suspense } from "react";
import { SearchInput } from "../../components/searchInput";
import { ButtonCreateSimulation } from "./components/buttonCreateSimulation";
import { ListSimulations } from "./components/listSimulation";
import { SelectStatus } from "./components/selectStatus";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string; status: string };
}) {
  const initialList = await getSimulations({
    nome: (searchParams["search"] as string) ?? undefined,
    status: (searchParams["status"] as string) ?? undefined,
  });

  return (
    <div className="m-6 flex flex-col gap-5">
      <div className="sticky left-0 top-0 z-10 flex flex-col gap-5 bg-white py-6 ">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-gray-12">Simulações</h1>
          <ButtonCreateSimulation />
        </div>
        <Suspense
          fallback={<div className="h-14 w-full rounded-md bg-gray-4" />}
        >
          <div className="flex items-center gap-2">
            <SearchInput placeholder="Buscar simulações por nome" />
            <SelectStatus />
          </div>
        </Suspense>
      </div>

      <ListSimulations listInitial={initialList} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Simulações - SIMULA",
  description:
    "Lista das simulações disponíveis no sistema de simulações de doenças",
};

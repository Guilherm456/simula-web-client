import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { SearchInput } from "../../components/searchInput";
import { ButtonCreateSimulation } from "./components/buttonCreateSimulation";
import { SelectStatus } from "./components/selectStatus";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="m-6 flex flex-col gap-5">
      <div className="sticky left-0 top-[4.25rem] z-10 flex flex-col gap-5 bg-white py-6 md:top-0">
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

      {children}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Simulações - SIMULA",
};

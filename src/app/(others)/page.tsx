import { Metadata } from "next";
import { ButtonCreateBase } from "./components/buttonCreateBase";
import { ListBases } from "./components/listBases";
import { SearchInput } from "./components/searchInput";

export default function Page() {
  return (
    <div className="m-6 flex flex-col gap-5">
      <div className="sticky left-0 top-[4.25rem] z-10 flex flex-col gap-5 bg-white py-6 md:top-0">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-gray-12">Bases</h1>
          <ButtonCreateBase />
        </div>
        <SearchInput placeholder="Buscar bases por nome" />
      </div>

      <ListBases />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Bases - SIMULAWeb",
  description: "Bases utilizadas para a criação de novas simulações",
};

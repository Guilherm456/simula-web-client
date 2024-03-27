import { Metadata } from "next";
import { ButtonCreateUser } from "./components/buttonCreateUser";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-6 flex flex-col gap-5">
      <div className="sticky left-0 top-[4.25rem] z-10 flex flex-col gap-5 bg-white py-6 md:top-0">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-gray-12">Usuários</h1>
          <ButtonCreateUser />
        </div>
        {/* <SearchInput /> */}
      </div>

      {children}

      {/* <ListBases /> */}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Usuários - SIMULAWeb",
  description: "Contas de usuários do sistema",
};

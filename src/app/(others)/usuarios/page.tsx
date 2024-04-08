import { userList } from "@services/user";
import { Metadata } from "next";
import { Suspense } from "react";
import { SearchInput } from "../components/searchInput";
import { ButtonCreateUser } from "./components/buttonCreateUser";
import { ListUsers } from "./components/listUsers";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const name = searchParams["search"] as string;

  const list = await userList({ name });

  return (
    <div className="m-6 flex flex-col gap-5">
      <div className="sticky left-0 top-0 z-10 flex flex-col gap-5 bg-white py-6 ">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-gray-12">Usuários</h1>
          <ButtonCreateUser />
        </div>
        <Suspense
          fallback={<div className="h-14 w-full rounded-md bg-gray-4" />}
        >
          <SearchInput placeholder="Buscar usuários por nome" />
        </Suspense>
      </div>

      <ListUsers listInitial={list} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Usuários - SIMULAWeb",
  description: "Contas de usuários do sistema",
};

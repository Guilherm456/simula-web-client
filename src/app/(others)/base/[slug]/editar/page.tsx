import { ParametersTable } from "@components/general/parametersTable/parametersTable";
import { getBase } from "@services/base";
import { notFound } from "next/navigation";
import { Header } from "../../../../../components/general/header";
import { FormBase } from "./components/formBase";

export default async function Page({ params }) {
  const data = await getBase(params.slug);

  if (!data) notFound();

  return (
    <>
      <Header name={data?.name} />
      <FormBase base={data} />
      <ParametersTable
        parameters={data?.parameters}
        structureParameters={data?.type?.parameters}
        editable
      />
    </>
  );
}

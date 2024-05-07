import { Header } from "@components/general/header";
import { ParametersTable } from "@components/general/parametersTable/parametersTable";
import { getSimulation } from "@services/simulation";
import { getStructure } from "@services/structures";
import { notFound } from "next/navigation";
import { FormSimulation } from "./components/formSimulation";

export default async function Page({ params }: { params: { slug: string } }) {
  const simulation = await getSimulation(params.slug);

  const structure = await getStructure(simulation?.structure as string);

  if (!simulation) notFound();

  return (
    <>
      <Header
        name={simulation.name}
        user={simulation.user?.toString() ?? ""}
        status={simulation.status}
      />

      <FormSimulation simulation={simulation} />

      <ParametersTable
        parameters={simulation.parameters}
        structureParameters={structure.parameters}
        editable
      />
    </>
  );
}

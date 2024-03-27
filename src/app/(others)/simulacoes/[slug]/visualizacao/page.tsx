import { getOutput } from "@services/output";
import { getSimulation } from "@services/simulation";
import { getStructure } from "@services/structures";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const simulation = await getSimulation(params.slug);

  if (!simulation) return notFound();


  const structure = await getStructure(simulation.structure as string);

  if (!structure) return notFound();

  

  return <div></div>;
}

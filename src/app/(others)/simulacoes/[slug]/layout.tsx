import { getSimulation } from "@services/simulation";
import { simulationStatus } from "@utils/simulation";
import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const simulation = await getSimulation(params.slug);

  return {
    title: `Simulação: ${simulation.name} - SIMULA`,
    description: `Simulação de ${simulation.name} utilizando a base ${simulation
      .base?.name} no status de ${
      simulationStatus[simulation.status as keyof typeof simulationStatus].label
    }`,
  };
}

export default async function Layout({ children }: { children: ReactNode }) {
  return <div className="m-6 flex flex-col gap-5">{children}</div>;
}

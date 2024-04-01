import { Header } from "@components/general/header";
import { AgentStructure } from "@models/structure.model";
import { getAllData, getDataByAgent } from "@services/output";
import { getSimulation } from "@services/simulation";
import { getStructure } from "@services/structures";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Tabs } from "../components/tabs";
import { ChartSimulation } from "./components/chartsSimulation";
import { SelectAgent } from "./components/selectAgent";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const simulation = await getSimulation(params.slug);

  return {
    title: `Visualização da simulação ${simulation.name} - SIMULA`,
  };
}

interface Props {
  params: { slug: string };
  searchParams: any;
}

export default async function Page({ params, searchParams }: Props) {
  const simulation = await getSimulation(params.slug);

  if (!simulation || !simulation?.output) return notFound();

  const structure = await getStructure(simulation.structure as string);

  if (!structure) return notFound();

  const actualAgent = searchParams["agent"] as string;
  let chartData;

  if (actualAgent) {
    const agentData = await getDataByAgent(
      simulation.output as string,
      actualAgent,
    );
    const agent = structure.agents.find((agent) => agent._id === actualAgent);
    chartData = [{ ...agent, stats: agentData }];
  } else {
    const allAgents = await getAllData(simulation.output as string);
    chartData = allAgents.map((agentData) => ({
      ...structure.agents.find(
        (agent) => agent._id === (agentData.agent as AgentStructure)._id,
      ),
      stats: agentData.stats,
    }));
  }

  return (
    <div>
      <Header
        name={`Visualização da simulação ${simulation.name}`}
        user={simulation.user}
      />

      <Tabs
        tabs={[
          {
            url: `/simulacoes/${simulation._id}`,
            label: "Informações",
          },
          {
            url: `/simulacoes/${simulation._id}/visualizacao`,
            label: "Visualização",
          },
        ]}
        actualTab={`/simulacoes/${simulation._id}/visualizacao`}
      />

      <div className="flex flex-col gap-6 py-4">
        <SelectAgent agents={structure.agents} />

        <div className="h-full w-full">
          <ChartSimulation data={chartData} />
        </div>
      </div>
    </div>
  );
}

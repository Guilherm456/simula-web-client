import { Card } from "@components/general/Card";
import { ParametersTable } from "@components/general/parametersTable/parametersTable";
import { getSimulation } from "@services/simulation";
import { getStructure } from "@services/structures";
import dayjs from "dayjs";
import { Building, CalendarClock, CalendarPlus } from "lucide-react";
import { notFound } from "next/navigation";
import { HeaderPage } from "./components/headerPage";
import { OutputCard } from "./components/outputCard";
import { Tabs } from "./components/tabs";

export default async function Page({ params }: { params: { slug: string } }) {
  const simulation = await getSimulation(params.slug);

  const structure = await getStructure(simulation?.structure as string);

  if (!simulation || !structure) notFound();

  return (
    <>
      <HeaderPage simulation={simulation} />
      <Tabs
        tabs={[
          {
            url: `/simulacoes/${simulation._id}`,
            label: "Informações",
          },
          {
            url: `/simulacoes/${simulation._id}/visualizacao`,
            label: "Visualização",
            disabled: !simulation.output,
          },
        ]}
        actualTab={`/simulacoes/${simulation._id}`}
      />

      <Card title="Informações">
        <div className="flex items-center gap-2">
          <Building size={20} className="text-gray-11" />
          <span className="text-gray-11">Estrutura utilizada:</span>
          <span className="text-gray-12">{structure.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building size={20} className="text-gray-11" />
          <span className="text-gray-11">Base utilizada:</span>
          <span className="text-gray-12">{simulation.base?.name ?? "-"}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarPlus size={20} className="text-gray-11" />
          <span className="text-gray-11">Criado em:</span>
          <span className="text-gray-12">
            {dayjs(simulation.createdAt).format("DD/MM/YYYY")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarClock size={20} className="text-gray-11" />
          <span className="text-gray-11">Última atualização:</span>
          <span className="text-gray-12">
            {simulation.updatedAt
              ? dayjs(simulation.updatedAt).format("DD/MM/YYYY")
              : "Nunca atualizado"}
          </span>
        </div>
      </Card>

      <div className="flex flex-col gap-2 rounded-2xl border border-solid border-gray-4 p-4">
        <span className="text-2xl font-bold text-gray-12">Entradas</span>
        <ParametersTable
          structureParameters={structure.parameters}
          parameters={simulation.parameters ?? {}}
        />
      </div>

      {simulation.output && (
        <OutputCard
          outputID={simulation.output as string}
          structure={structure}
        />
      )}
    </>
  );
}

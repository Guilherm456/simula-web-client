import { Card } from "@components/general/Card";
import { Header } from "@components/general/header";
import { getStructure } from "@services/structures";
import { Building } from "lucide-react";
import { notFound } from "next/navigation";
import { CardParameters } from "./components/parametersCards";

export default async function Page({ params }: { params: { slug: string } }) {
  const structure = await getStructure(params.slug);

  if (!structure) notFound();

  return (
    <div className="m-6 flex flex-col gap-5">
      <Header name={structure.name} />

      <Card title="Informações">
        <div className="flex items-center gap-2">
          <Building size={20} className="text-gray-500" />
          <span className="text-gray-700">Nome da Estrutura:</span>
          <span className="text-gray-800">{structure.name}</span>
        </div>
      </Card>

      <Card title="Parâmetros">
        <div className="ml-4">
          <CardParameters parameters={structure.parameters} />
        </div>
      </Card>

      <Card title="Parâmetros de Saída">
        <div className="ml-4">
          <CardParameters parameters={structure.outputParameters} />
        </div>
      </Card>

      <Card title="Agentes">
        <div className="ml-4 flex flex-wrap gap-4">
          {structure.agents.map((agent) => (
            <div
              key={agent._id}
              className="rounded-md border border-dashed border-gray-200 p-4"
            >
              <div className="font-bold text-gray-700">{agent.name}</div>
              <div className="ml-4">
                <div className="text-gray-600">Label: {agent.label}</div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Cor escolhida:</span>
                  <span
                    className="h-4 w-4 rounded-full border border-solid border-gray-400"
                    style={{ backgroundColor: agent.color }}
                  ></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

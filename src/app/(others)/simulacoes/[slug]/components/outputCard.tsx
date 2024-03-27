import { ParametersTable } from "@components/general/parametersTable/parametersTable";
import { Structure } from "@models/structure.model";
import { getOutput } from "@services/output";
import { FC } from "react";

interface Props {
  outputID: string;
  structure: Structure;
}
export const OutputCard: FC<Props> = async ({ outputID, structure }) => {
  const output = await getOutput(outputID);

  if (!output) return null;

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-solid border-gray-4 p-4">
      <span className="text-2xl font-bold text-gray-12">Resultados</span>
      <ParametersTable
        structureParameters={structure.outputParameters}
        parameters={output.data ?? {}}
      />
    </div>
  );
};

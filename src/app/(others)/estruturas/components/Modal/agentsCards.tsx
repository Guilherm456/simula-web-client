"use client";
import { Button, Textfield } from "@components/ui";
import { Plus, Trash } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { structureSchema } from "@schema/structure.schema";

import { InferType } from "yup";
import { CodeTextArea } from "../codeInput";

export const AgentsCard = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<InferType<typeof structureSchema>>();

  const { fields, append, remove } = useFieldArray({
    name: "agents",
    control,
  });

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xl text-gray-12">Agentes</span>

          <Button
            className="w-min bg-transparent text-gray-12"
            onClick={() =>
              append({
                name: "",
                label: "",
                color: "#000000",
                onData: `function onData(data, agent) {
  // Crie a lógica de processamento dos dados aqui, que deve retornar um array de números
  // Cada posição do array representa um ciclo de simulação
  // O tamanho do array deve ser igual ao número de ciclos da simulação
  // Exemplo: return [1, 2, 3, 4, 5];
  
}`,
              })
            }
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
      <div className="grid gap-1 ">
        {fields.map((agent, index) => (
          <div
            key={agent.id}
            className="border-t border-solid border-gray-6 py-4 "
          >
            <div key={agent.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-12">
                  Agente {index + 1}
                </span>
                <Button
                  className="w-min border border-solid border-red-500 bg-transparent text-red-500"
                  onClick={() => remove(index)}
                >
                  <Trash size={16} />
                </Button>
              </div>
              <Textfield
                label="Nome"
                {...register(`agents.${index}.name`)}
                error={!!errors.agents?.[index]?.name}
                errorMessage={errors.agents?.[index]?.name?.message}
                id={`agents.${index}.name-input`}
              />
              <Textfield
                label="Label"
                {...register(`agents.${index}.label`)}
                error={!!errors.agents?.[index]?.label}
                errorMessage={errors.agents?.[index]?.label?.message}
                id={`agents.${index}.label-input`}
              />
              <Textfield
                label="Cor"
                type="color"
                {...register(`agents.${index}.color`)}
                error={!!errors.agents?.[index]?.color}
                errorMessage={errors.agents?.[index]?.color?.message}
                id={`agents.${index}.color-input`}
              />

              <Controller
                name={`agents.${index}.onData`}
                control={control}
                render={({ field }) => (
                  <CodeTextArea
                    {...field}
                    label="Código de extração de dados"
                    id={`agents.${index}.onData-input`}
                    name={`agents.${index}.onData`}
                    style={{ width: "100%", height: 200 }}
                  />
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

"use client";
import { Button, Textfield } from "@components/ui";
import { Plus, Trash } from "lucide-react";
import AceEditor from "react-ace-builds";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import "ace-builds/src-min-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/mode-javascript";
export const AgentsCard = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

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
                className="input"
              />
              <Textfield
                label="Label"
                {...register(`agents.${index}.label`)}
                className="input"
              />
              <Textfield
                label="Cor"
                type="color"
                {...register(`agents.${index}.color`)}
                className="input"
              />

              <Controller
                name={`agents.${index}.onData`}
                control={control}
                render={({ field }) => (
                  <div className="flex w-full flex-col gap-2">
                    <label className={"font-medium text-gray-12"}>
                      Código de processamento de dados
                    </label>
                    <AceEditor
                      mode="java"
                      theme="github_dark"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                      style={{ width: "100%", height: 200 }}
                      name={`agents.${index}.onData`}
                      setOptions={{
                        useWorker: false,
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

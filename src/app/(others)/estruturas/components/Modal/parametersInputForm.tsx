import { Button } from "@components/ui";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ParametersInput } from "./parameters/parametersInput";

export const ParametersInputForm = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "parameters",
    control,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xl text-gray-12">Parâmetros</span>

          <Button
            className="w-min bg-transparent text-gray-12"
            onClick={() =>
              append({
                name: "",
                values: [{ name: "", type: "string" }],
              })
            }
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
      <div className="grid gap-1">
        {fields.map((_, index) => (
          <div
            key={index}
            className="border-t border-solid border-gray-6 py-4 "
          >
            <ParametersInput
              index={index}
              path="parameters"
              onDelete={(index) => remove(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

import { Button, Select, SelectItem, Textfield } from "@components/ui";
import { Plus, Trash } from "lucide-react";
import { FC, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ValuesInput } from "./valuesInput";

interface Props {
  index: number;
  isSubParameter?: boolean;
  path: string;
  onDelete: (index: number) => void;
}

export const ParametersInput: FC<Props> = ({
  index,
  isSubParameter,
  path,
  onDelete,
}) => {
  const { control, register } = useFormContext();

  const pathCurrent = `${path}.${index}`;

  const [type, setType] = useState<"values" | "subParameters">("values");

  const {
    fields: subFields,
    append,
    remove,
  } = useFieldArray({
    name: `${pathCurrent}.${type}`,
    control,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center  justify-between font-semibold">
        <span className="text-xl text-gray-12">
          {!isSubParameter && `Parâmetro ${index + 1}`}
        </span>
        <Button
          className="w-min border border-solid border-red-500 bg-transparent text-red-500"
          onClick={() => onDelete(index)}
        >
          <Trash size={16} />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Textfield
          label={`Nome do ${isSubParameter ? "subparâmetro" : "parâmetro"}`}
          {...register(`${pathCurrent}.name`)}
          className="input"
        />
        <Select
          label="Tipo"
          placeholder="Selecione o tipo"
          value={type}
          onValueChange={(value) => {
            subFields.forEach((_, index) => {
              remove(index);
            });

            setType(value as "values" | "subParameters");
          }}
          disabled={isSubParameter}
          id={`type-${index}-select`}
        >
          <SelectItem value="values" id={`select-values-${index}-button`}>
            Valores
          </SelectItem>
          <SelectItem value="subParameters" id={`select-sub-${index}-button`}>
            Subparâmetros
          </SelectItem>
        </Select>

        <Button
          className="mt-8 h-10 w-min bg-transparent text-gray-12"
          id={`button-create-sub-${index}-button`}
          aria-label={`Adicionar um valor/subparâmetro ao parâmetro ${
            index + 1
          }`}
          onClick={() => {
            if (type === "values") {
              append({ name: "", type: "string" });
            } else {
              append({
                name: "",
                type: "values",
                values: [{ name: "", type: "string" }],
              });
            }
          }}
        >
          <Plus size={16} />
        </Button>
      </div>

      {subFields.map((_, subIndex) =>
        type === "values" ? (
          <ValuesInput
            key={subIndex}
            index={subIndex}
            path={`${pathCurrent}.values`}
            onDelete={remove}
          />
        ) : (
          <ParametersInput
            key={subIndex}
            index={subIndex}
            isSubParameter
            path={`${pathCurrent}.subParameters`}
            onDelete={remove}
          />
        ),
      )}
    </div>
  );
};

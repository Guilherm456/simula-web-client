import { Button, Select, SelectItem, Textfield } from "@components/ui";
import { structureSchema } from "@schema/structure.schema";
import { Trash } from "lucide-react";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InferType } from "yup";

interface Props {
  index: number;
  path: string;
  onDelete: (index: number) => void;
}
export const ValuesInput: FC<Props> = ({ index, path, onDelete }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<InferType<typeof structureSchema>>();

  const pathCurrent = `${path}.${index}`;

  return (
    <div className="flex gap-2">
      <Textfield
        label="Nome do valor"
        {...register(`${pathCurrent}.name`)}
        error={!!errors?.[path]?.[index]?.name}
        errorMessage={errors?.[path]?.[index]?.name?.message}
      />
      <Controller
        name={`${pathCurrent}.type`}
        control={control}
        render={({ field }) => (
          <Select
            label="Tipo"
            placeholder="Selecione o tipo do valor"
            {...field}
          >
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Número</SelectItem>
            <SelectItem value="mixed">Misto</SelectItem>
          </Select>
        )}
      />
      <Button
        className="mt-8 h-10 w-min border border-solid border-red-500 bg-transparent text-red-500"
        onClick={() => onDelete(index)}
      >
        <Trash size={16} />
      </Button>
    </div>
  );
};

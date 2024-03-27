import { Button, Select, SelectItem, Textfield } from "@components/ui";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export const ParametersInput = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "parameters",
    control,
  });

  console.debug("fields", fields);

  return (
    <div className="flex flex-col gap-2 border-t border-solid border-gray-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xl text-gray-12">Parâmetros</span>

          <Button
            className="w-min bg-transparent text-gray-12"
            onClick={() =>
              append({
                name: "",
                type: "values",
                values: [{ name: "", type: "string" }],
              })
            }
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
      <div className="grid gap-1">
        {fields.map((parameter, index) => (
          <div key={parameter.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xl text-gray-12">
                Parâmetro {index + 1}
              </span>
              <Button
                className="w-min bg-red-500 text-white"
                onClick={() => remove(index)}
              >
                <Trash size={16} />
                Remover
              </Button>
            </div>
            <Textfield
              label="Nome"
              {...control.register(`parameters.${index}.name`)}
              className="input"
            />
            <div className="flex gap-2">
              <Select
                label="Tipo"
                {...control.register(`parameters.${index}.type`)}
                className="input"
              >
                <SelectItem value="values">Valores</SelectItem>
                <SelectItem value="subParameters">Subparâmetros</SelectItem>
              </Select>
              {parameter.type === "values" && (
                <ValuesInput
                  index={index}
                  register={control.register}
                  control={control}
                />
              )}
              {parameter.type === "subParameters" && (
                <SubParametersInput
                  index={index}
                  register={control.register}
                  control={control}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ValuesInput = ({ index, register, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: `parameters.${index}.values`,
    control,
  });

  return (
    <div className="flex flex-col gap-2">
      {fields.map((value, valueIndex) => (
        <div key={value.id} className="flex gap-2">
          <Textfield
            label="Nome"
            {...register(`parameters.${index}.values.${valueIndex}.name`)}
            className="input"
          />
          <Select
            label="Tipo"
            {...register(`parameters.${index}.values.${valueIndex}.type`)}
            className="input"
          >
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Número</SelectItem>
            <SelectItem value="mixed">Misto</SelectItem>
          </Select>
          <Button
            className="w-min bg-red-500 text-white"
            onClick={() => remove(valueIndex)}
          >
            <Trash size={16} />
          </Button>
        </div>
      ))}
      <Button
        className="w-min bg-transparent text-gray-12"
        onClick={() => append({ name: "", type: "string" })}
      >
        <Plus size={16} /> Adicionar valor
      </Button>
    </div>
  );
};

const SubParametersInput = ({ index, register, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: `parameters.${index}.subParameters`,
    control,
  });

  return (
    <div className="flex flex-col gap-2">
      {fields.map((subParameter, subParameterIndex) => (
        <div key={subParameter.id} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xl text-gray-12">
              Subparâmetro {subParameterIndex + 1}
            </span>
            <Button
              className="w-min bg-red-500 text-white"
              onClick={() => remove(subParameterIndex)}
            >
              <Trash size={16} />
              Remover
            </Button>
          </div>
          <Textfield
            label="Nome"
            {...register(
              `parameters.${index}.subParameters.${subParameterIndex}.name`,
            )}
            className="input"
          />
          <ValuesInput
            index={`${index}.subParameters.${subParameterIndex}`}
            register={register}
            control={control}
          />
        </div>
      ))}
      <Button
        className="w-min bg-transparent text-gray-12"
        onClick={() =>
          append({ name: "", values: [{ name: "", type: "string" }] })
        }
      >
        <Plus size={16} /> Adicionar subparâmetro
      </Button>
    </div>
  );
};

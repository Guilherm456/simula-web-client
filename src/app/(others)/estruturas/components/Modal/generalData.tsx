import { Textfield } from "@components/ui";
import { useFormContext } from "react-hook-form";

export const GeneralData = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Textfield
        label="Nome da estrutura"
        placeholder="Digite o nome da estrutura"
        {...register("name")}
        error={!!errors.name}
        errorMessage={errors.name?.message as string}
        id="structure-name-input"
      />

      <Textfield
        label="Pasta do simulador"
        placeholder="Digite o nome da pasta do simulador"
        {...register("folder")}
        error={!!errors.folder}
        errorMessage={errors.folder?.message as string}
        id="structure-folder-input"
      />

      <Textfield
        label="Pasta de entrada dos parâmetros"
        placeholder="Digite o nome da pasta de entrada dos parâmetros"
        {...register("inputsFolder")}
        error={!!errors.inputsFolder}
        errorMessage={errors.inputsFolder?.message as string}
        id="structure-inputsFolder-input"
      />

      <Textfield
        label="Pasta de saída dos resultados"
        placeholder="Digite o nome da pasta de saída dos resultados"
        {...register("outputsFolder")}
        error={!!errors.outputsFolder}
        errorMessage={errors.outputsFolder?.message as string}
        id="structure-outputsFolder-input"
      />

      <Textfield
        label="Comando de execução do simulador"
        placeholder="Digite o comando de execução do simulador"
        {...register("executeCommand")}
        error={!!errors.executeCommand}
        errorMessage={errors.executeCommand?.message as string}
        id="structure-executeCommand-input"
      />
    </>
  );
};

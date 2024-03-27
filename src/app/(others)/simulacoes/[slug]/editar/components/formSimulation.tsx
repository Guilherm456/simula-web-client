"use clent";
import { Button, Textfield } from "@components/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { Base } from "@models/index";
import { Simulacao, SimulacaoUpdate } from "@models/simulation.model";
import { simulationUpdateSchema } from "@schema/simulation.schema";
import { updateSimulation } from "@services/simulation";
import { useMutation } from "@tanstack/react-query";
import { successNotification } from "@utils/notifications";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  simulation: Simulacao;
}

export const FormSimulation: FC<Props> = ({ simulation }) => {
  const { mutate, isPending: loading } = useMutation({
    mutationFn: async (data: SimulacaoUpdate) =>
      await updateSimulation(simulation._id!, data),
    mutationKey: ["simulation", simulation._id],
    onSuccess: () => {
      successNotification("Simulação atualizada com sucesso");
      router.back();
    },
  });

  const form = useForm({
    defaultValues: {
      name: simulation.name,
    },
    resolver: yupResolver(simulationUpdateSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = form;

  const router = useRouter();
  return (
    <FormProvider {...form}>
      <form
        id="simulation-form"
        onSubmit={handleSubmit(mutate as any)}
        className="grid gap-2 rounded-2xl border border-solid border-gray-4 p-4"
      >
        <Textfield
          {...register("name")}
          label="Nome"
          className="md:w-1/4"
          placeholder="Insira o nome da simulação"
          id="simulation-name-input"
        />

        <Textfield
          value={(simulation.base as Base)?.name}
          label="Base"
          className="md:w-1/4"
          disabled
          id="simulation-base-input"
        />
      </form>

      <div className="absolute bottom-4 right-4 flex w-full justify-end gap-2 border-t border-solid border-gray-4 pt-4">
        <Button
          className="w-min border border-solid border-gray-4 bg-transparent text-gray-12"
          onClick={() => router.back()}
          id="cancel-button"
          aria-label="Cancelar"
        >
          Cancelar
        </Button>
        <Button
          form="simulation-form"
          loading={loading}
          disabled={!isDirty}
          type="submit"
          className="w-min"
          id="save-button"
          aria-label="Salvar simulação"
        >
          Salvar
        </Button>
      </div>
    </FormProvider>
  );
};

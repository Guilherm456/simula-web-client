"use client";
import { Button, Textfield } from "@components/ui";
import { Base } from "@models/index";
import { updateBase } from "@services/base";
import { useMutation } from "@tanstack/react-query";
import { successNotification } from "@utils/notifications";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  base: Base;
}
export const FormBase: FC<Props> = ({ base }) => {
  const form = useForm({
    defaultValues: {
      name: base.name,
      description: base.description,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = form;

  const { mutate, isPending: loading } = useMutation({
    mutationKey: ["base", base._id],
    mutationFn: async (data: Base) => await updateBase(base._id!, data),
    onSuccess: () => {
      successNotification("Base atualizada com sucesso");
      router.back();
    },
  });

  const router = useRouter();
  return (
    <>
      <FormProvider {...form}>
        <form
          id="base-form"
          className="grid gap-2 rounded-2xl border border-solid border-gray-4 p-4"
          onSubmit={handleSubmit(mutate as any)}
        >
          <Textfield
            label="Nome"
            placeholder="Digite o nome da base"
            className="md:w-1/4"
            {...register("name")}
          />
          <Textfield
            label="Descrição (Opcional)"
            placeholder="Digite a descrição da base (opcional)"
            className="md:w-1/4"
            {...register("description")}
          />
        </form>
      </FormProvider>
      <div className="absolute bottom-4 right-4 flex w-full justify-end gap-2 border-t border-solid border-gray-4 pt-4">
        <Button
          className="border border-solid border-gray-4 bg-transparent text-gray-12 md:w-min"
          id="cancel-button"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          className="md:w-min"
          type="submit"
          loading={loading}
          id="save-button"
          aria-label="Salvar base"
          form="base-form"
          disabled={!isDirty}
        >
          Salvar
        </Button>
      </div>
    </>
  );
};

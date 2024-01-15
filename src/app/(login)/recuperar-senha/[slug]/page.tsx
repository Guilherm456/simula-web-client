"use client";
import { Button, Spinner, Textfield } from "@components/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "@schema/login.schema";
import { resetPassword } from "@services/login";
import { useMutation } from "@tanstack/react-query";
import { successNotification } from "@utils/notifications";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function RecoverPassword({ params }) {
  const form = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const router = useRouter();

  useEffect(() => {
    if (params?.slug) setValue("token", params?.slug);
  }, [params?.slug]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["recover-password"],
    mutationFn: async (data) => {
      const { newPassword, token } = data;
      return await resetPassword({ newPassword, token });
    },
    onSuccess: () => {
      successNotification("Senha alterada com sucesso!");
      router.push("/login");
    },
  });

  return (
    <>
      <div>
        <span className="text-2xl font-bold text-gray-12">
          Definir nova senha
        </span>
        <span className="block text-sm text-gray-11">
          Insira sua nova senha e confirme-a.
        </span>
      </div>

      <div className="space-y-4">
        <Textfield
          label="Senha"
          placeholder="Digite sua nova senha"
          aria-label="Senha"
          type="password"
          error={!!errors.newPassword?.message}
          errorMessage={errors.newPassword?.message}
          {...register("newPassword", {
            required: true,
          })}
        />
        <Textfield
          label="Confirme sua senha"
          placeholder="Digite sua nova senha"
          aria-label="Senha"
          type="password"
          error={!!errors.confirmPassword?.message}
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: true,
          })}
        />
        <Button onClick={handleSubmit(mutate)}>
          {isPending && <Spinner className="h-4 w-4" />}
          Alterar senha
        </Button>
      </div>
    </>
  );
}

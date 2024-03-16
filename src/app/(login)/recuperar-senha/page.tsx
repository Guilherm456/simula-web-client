"use client";
import { Button, Spinner, Textfield } from "@components/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverPasswordEmailSchema } from "@schema/login.schema";
import { recoverPassword } from "@services/login";
import { useMutation } from "@tanstack/react-query";
import { successNotification } from "@utils/notifications";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RecuperarSenha() {
  const form = useForm({
    resolver: yupResolver(recoverPasswordEmailSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationKey: ["recuperar-senha"],
    mutationFn: recoverPassword,
    onSuccess: () => {
      successNotification(
        "Recuperação de senha efetuada com sucesso! Por favor, confira seu e-mail",
      );
      router.push("/login");
    },
  });

  return (
    <>
      <div>
        <span className="text-2xl font-bold text-gray-12">Recuperar senha</span>
        <span className="block text-sm text-gray-11">
          Insira seu e-mail para receber um link de recuperação de senha.
        </span>
      </div>

      <form id="recover-password-form" onSubmit={handleSubmit(mutate as any)}>
        <div className="space-y-4">
          <Textfield
            label="E-mail"
            placeholder="Digite seu e-mail"
            aria-label="E-mail"
            type="email"
            error={!!errors.email?.message}
            errorMessage={errors.email?.message}
            {...register("email", {
              required: true,
            })}
          />

          <Button type="submit">
            {isPending && <Spinner className="h-4 w-4" />}
            Recuperar senha
          </Button>
        </div>
      </form>
    </>
  );
}

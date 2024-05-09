"use client";
import { Button, Spinner, Textfield } from "@components/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@schema/login.schema";
import { login } from "@services/login";
import useAuth from "@services/logout";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Login() {
  const form = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  const { login: loginSystem } = useAuth();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: loginSystem,
  });

  return (
    <>
      <div>
        <span className="text-2xl font-bold text-gray-12">Login</span>
        <span className="block text-sm text-gray-11">
          Insira seus dados para acessar o sistema ou peça à um administrador
          para criar uma conta.
        </span>
      </div>

      <form id="login-form" onSubmit={handleSubmit(mutate as any)}>
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
            id="email-input"
          />
          <Textfield
            label="Senha"
            placeholder="Digite sua senha"
            aria-label="Senha"
            type="password"
            error={!!errors.password?.message}
            errorMessage={errors.password?.message}
            {...register("password", {
              required: true,
            })}
            id="password-input"
          />
          <Button type="submit" id="login-button">
            {isPending && <Spinner className="h-4 w-4" />}
            Entrar
          </Button>

          <Link
            className="inline-block w-full text-end text-sm font-semibold text-blue-700 underline"
            href="/recuperar-senha"
          >
            Esqueci minha senha
          </Link>
        </div>
      </form>
    </>
  );
}

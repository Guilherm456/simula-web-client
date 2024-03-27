"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Select,
  SelectItem,
  Spinner,
  Textfield,
} from "@components/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "@models/user.model";
import { userCreateSchema } from "@schema/user-create.schema";
import { createUser } from "@services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { infoNotification } from "@utils/notifications";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalUser: FC<Props> = ({ onClose, open }) => {
  const form = useForm({
    resolver: yupResolver(userCreateSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = form;

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      handleClose();
      infoNotification("Usuário criado com sucesso");
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: User & { confirmPassword: string }) => {
    const { confirmPassword, ...user } = data;
    mutate(user);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) handleClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar novo usuário</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo usuário.
          </DialogDescription>
        </DialogHeader>

        <form id="create-user-form" onSubmit={handleSubmit(onSubmit as any)}>
          <div className="flex flex-col gap-4">
            <Textfield
              label="Nome"
              placeholder="Insira aqui o nome do usuário"
              {...register("name")}
              error={!!errors.name}
              errorMessage={errors.name?.message as string}
              id="name-input"
            />
            <Textfield
              label="Email"
              placeholder="Insira aqui o email do usuário"
              {...register("email")}
              error={!!errors.email}
              errorMessage={errors.email?.message as string}
              id="email-input"
            />
            <Textfield
              label="Senha"
              placeholder="Insira aqui a senha do usuário"
              {...register("password")}
              error={!!errors.password}
              errorMessage={errors.password?.message as string}
              id="password-input"
            />

            <Textfield
              label="Confirme a senha"
              placeholder="Confirme a senha do usuário"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message as string}
              id="confirm-password-input"
            />

            <Select
              label="Tipo de usuário"
              value={watch("role")}
              onValueChange={(value) => setValue("role", value)}
              error={!!errors.role}
              errorMessage={errors.role?.message as string}
              placeholder="Selecione o tipo de usuário"
              id="user-type-select"
            >
              <SelectItem value="admin" id="select-option-admin">
                Administrador
              </SelectItem>
              <SelectItem value="user" id="select-option-user">
                Usuário
              </SelectItem>
              <SelectItem value="guest" id="select-option-guest">
                Convidado
              </SelectItem>
            </Select>
          </div>
        </form>

        <DialogFooter>
          <Button
            className="w-full bg-gray-3 text-gray-12"
            id="button-cancel-user"
            aria-label="Cancelar a criação de usuário"
            disabled={isPending}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            className="w-full"
            type="submit"
            id="button-create-user"
            aria-label="Criar usuário"
            loading={isPending}
            disabled={isPending}
            form="create-user-form"
          >
            {isPending && <Spinner className="h-4 w-4" />}
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

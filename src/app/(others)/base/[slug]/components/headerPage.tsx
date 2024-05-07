"use client";

import { Confirmation } from "@components/general/confirmation";
import { Header } from "@components/general/header";
import { Base } from "@models/index";
import { deleteBase } from "@services/base";
import { executeSimulation } from "@services/simulation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { infoNotification } from "@utils/notifications";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface Props {
  base: Base;
}
export const HeaderPage: FC<Props> = ({ base }) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending: loading } = useMutation({
    mutationKey: ["simulations"],
    mutationFn: async () => deleteBase(base._id!),
    onSuccess: () => {
      setOpenConfirm(false);
      router.push("/");
      infoNotification("Base excluída com sucesso");

      queryClient.invalidateQueries({
        queryKey: ["base"],
        exact: false,
      });
    },
  });

  const { mutate: execute } = useMutation({
    mutationFn: async () => executeSimulation(base._id!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["simulations"],
        exact: false,
      });
      infoNotification("Simulação executada com sucesso");
      router.push("/simulacoes?status=RUNNING");
    },
  });

  return (
    <>
      <Header
        urlEdit={`/base/${base?._id}/editar`}
        name={base?.name}
        editable
        user={base?.user?.toString()}
        onDelete={() => setOpenConfirm(true)}
      />

      <Confirmation
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Excluir base"
        description="Tem certeza que deseja excluir essa base?"
        onConfirm={() => mutate()}
        classnameButtonConfirm="bg-red-500 text-white"
        loading={loading}
      />
    </>
  );
};

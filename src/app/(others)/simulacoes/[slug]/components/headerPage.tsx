"use client";

import { Confirmation } from "@components/general/confirmation";
import { Header } from "@components/general/header";
import { Simulacao } from "@models/simulation.model";
import { deleteSimulation, executeSimulation } from "@services/simulation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { infoNotification } from "@utils/notifications";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface Props {
  simulation: Simulacao;
}
export const HeaderPage: FC<Props> = ({ simulation }) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending: loading } = useMutation({
    mutationKey: ["simulations"],
    mutationFn: async () => deleteSimulation(simulation._id!),
    onSuccess: () => {
      setOpenConfirm(false);
      router.push("/simulacoes");
      infoNotification("Simulação excluída com sucesso");

      queryClient.invalidateQueries({
        queryKey: ["simulations"],
        exact: false,
      });
    },
  });

  const { mutate: execute } = useMutation({
    mutationFn: async () => executeSimulation(simulation._id!),
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
        urlEdit={`/simulacoes/${simulation._id}/editar`}
        name={simulation.name}
        editable
        user={simulation.user?.toString() ?? ""}
        status={simulation.status}
        onDelete={() => setOpenConfirm(true)}
        customButton={[
          {
            icon: <RotateCw size={20} />,
            onClick: execute,
            ariaLabel: "Atualizar simulação",
            id: "execute-simulation-button",
          },
        ]}
      />

      <Confirmation
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Excluir simulação"
        description="Tem certeza que deseja excluir essa simulação?"
        onConfirm={() => mutate()}
        classnameButtonConfirm="bg-red-500 text-white"
        loading={loading}
      />
    </>
  );
};

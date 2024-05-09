import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Textfield,
} from "@components/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { SimulacaoCreate } from "@models/simulation.model";
import { simulationSchema } from "@schema/simulation.schema";
import { getBases } from "@services/base";
import { createSimulation } from "@services/simulation";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { infoNotification } from "@utils/notifications";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
}
export const ModalSimulation: FC<Props> = ({ onClose, open }) => {
  const form = useForm({
    resolver: yupResolver(simulationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = form;

  const [query, setQuery] = useState<string>("");

  const {
    data: base,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["bases", query],
    queryFn: async ({ pageParam = 0 }) =>
      await getBases({
        offset: pageParam,
        name: query ?? undefined,
      }),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending: loadingSubmit } = useMutation({
    mutationKey: ["simulations"],
    onSuccess: (data) => {
      handleClose();

      infoNotification("Simulação criada com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["simulations"],
        exact: false,
      });

      router.push(`/simulacoes/${data._id}`);
    },

    mutationFn: async (data: SimulacaoCreate) => await createSimulation(data),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-h-dvh h-[100dvh] w-[100dvw] max-w-[100dvw] overflow-y-auto md:h-[650px] md:w-[770px] md:rounded-l-2xl">
        <DialogHeader>
          <DialogTitle id="title-simulation-modal">Criar simulação</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar uma nova simulação
          </DialogDescription>
        </DialogHeader>
        <form id="form-simulation" onSubmit={handleSubmit(mutate as any)}>
          <Textfield
            label="Nome"
            placeholder="Digite o nome da simulação"
            {...register("name")}
            error={!!errors.name}
            errorMessage={errors.name?.message}
            id="name-textfield"
          />

          <Controller
            name="base"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                label="Base"
                placeholder="Selecione uma base"
                options={base?.pages?.map((page) => page?.content).flat() ?? []}
                getOptionLabel={(option) => option.name}
                onMore={() => {
                  if (hasNextPage) fetchNextPage();
                }}
                onChange={(value) => onChange(value)}
                value={value}
                onSearch={setQuery}
                error={!!errors.base}
                errorMessage={errors.base?.message}
                id="base-autocomplete"
                aria-label="Selecione uma base para a simulação"
              />
            )}
          />
        </form>

        <DialogFooter>
          <Button
            type="button"
            className="w-full bg-gray-3 text-gray-12"
            onClick={handleClose}
            disabled={loadingSubmit}
            id="cancel-simulation-button"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="form-simulation"
            loading={loadingSubmit}
            disabled={loadingSubmit}
            id="create-simulation-button"
            aria-label="Criar simulação"
          >
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

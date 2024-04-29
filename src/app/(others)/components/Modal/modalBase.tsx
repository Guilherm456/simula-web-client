import { Button, Textfield } from "@components/ui";
import { Autocomplete } from "@components/ui/autocomplete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateBaseDTO,
  CreateBaseWithFilesDTO,
  Structure,
} from "@models/index";
import { baseSchema } from "@schema/base.schema";
import { createBase, createBaseWithFiles } from "@services/base";
import { getAllStructures } from "@services/structures";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { errorNotification, infoNotification } from "@utils/notifications";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ParametersExibition } from "./parametersExibition";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalBase: FC<Props> = ({ open, onClose }) => {
  const form = useForm({
    resolver: yupResolver(baseSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;

  const router = useRouter();

  const [query, setQuery] = useState("");

  const queryClient = useQueryClient();

  const {
    data: structures,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
    queryKey: ["structures", query],
    queryFn: async () =>
      await getAllStructures({
        name: query,
      }),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["bases"],
    mutationFn: async (data: CreateBaseDTO) => await createBase(data),
    onSuccess: (data) => {
      infoNotification("Base criada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["bases"],
        exact: false,
      });

      router.push(`/base/${data._id}`);
    },
  });

  const { mutate: mutateUpload, isPending: pendingUpload } = useMutation({
    mutationKey: ["bases"],
    mutationFn: async (data: CreateBaseWithFilesDTO) =>
      createBaseWithFiles(data),
    onSuccess: (data) => {
      infoNotification("Base criada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["bases"],
        exact: false,
      });
      router.push(`/base/${data._id}`);
    },
  });

  const onSendFiles = useCallback(
    (files: File[], indexParam: number) => {
      files.forEach((file) => {
        const onlyName = file.name.split(".")[0];
        let index = -1;
        const { subParameters, name } =
          (watch("type") as Structure)?.parameters.find(
            (_, index) => index === indexParam,
          ) ?? {};

        const indexSub = subParameters?.findIndex(
          (sub) => sub.name === onlyName,
        );

        if (indexSub !== undefined && indexSub !== -1) {
          index = indexParam + indexSub + (indexParam > 0 ? 1 : 0);
        } else if (name === onlyName) {
          index = indexParam;
        }

        if (index === -1) {
          errorNotification(
            "Arquivo(s) não encontrado(s! O(s) arquivo(s) deve ter o mesmo nome que o parâmetro ou subparâmetro.",
          );
          return;
        }

        setValue(`files.${index}`, file);

        infoNotification("Arquivo(s) importado(s) com sucesso!");
      });
    },
    [structures],
  );

  useEffect(() => {
    if (!watch("type")) return;

    const structure = watch("type") as Structure;

    setValue("files", Array.from({ length: structure.lengthParams }));
  }, [watch("type")]);

  const onSubmit = async (data: CreateBaseWithFilesDTO) => {
    if (watch("files")?.some((file) => !file)) {
      errorNotification("Todos os arquivos devem ser importados!");
      return;
    }
    mutateUpload(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        modal
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <DialogContent className="max-h-dvh h-[100dvh] w-[100dvw] max-w-[100dvw] overflow-y-auto md:h-[650px] md:w-[770px] md:rounded-l-2xl">
          <DialogHeader>
            <DialogTitle>Criar nova base</DialogTitle>
            <DialogDescription>
              As bases são usadas posteriormente para a criação de novas
              simulações, onde seus dados são clonados para a nova simulação.
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...form}>
            <form
              id="create-base-form"
              onSubmit={handleSubmit(onSubmit as any)}
            >
              <div className="flex flex-col gap-2">
                <Textfield
                  label="Nome da base"
                  placeholder="Insira aqui o nome da base"
                  {...register("name")}
                  error={!!errors.name}
                  errorMessage={errors.name?.message as string}
                  id="name-base-input"
                />
                <Autocomplete
                  label="Estrutura"
                  value={watch("type")}
                  onChange={(value) => setValue("type", value)}
                  placeholder="Selecione uma estrutura para a base"
                  onSearch={(value) => setQuery(value)}
                  options={structures?.pages?.flatMap((page) => page.content)}
                  getOptionLabel={(option) => option.name}
                  inputProps={{
                    error: !!errors.type,
                    errorMessage: errors.type?.message as string,
                  }}
                  onMore={() => {
                    if (hasNextPage && !isLoading) fetchNextPage();
                  }}
                  id="structure-base-autocomplete"
                />
              </div>

              <ParametersExibition
                onSendFiles={onSendFiles}
                parameters={(watch("type") as Structure)?.parameters}
                onCreateBase={handleSubmit((data) => {
                  delete data.files;
                  mutate(data as CreateBaseDTO);
                })}
              />
            </form>
          </FormProvider>
          <DialogFooter>
            <Button
              className="w-full bg-gray-3 text-gray-12"
              disabled={isPending || pendingUpload}
              onClick={handleClose}
              id="cancel-create-base-button"
            >
              Cancelar
            </Button>
            <Button
              className="w-full"
              type="submit"
              form="create-base-form"
              // onClick={handleSubmit(onSubmit as any)}
              loading={isPending || pendingUpload}
              id="create-base-button"
            >
              Criar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui";
import { Stepper } from "@components/ui/stepper";
import { yupResolver } from "@hookform/resolvers/yup";
import { structureSchema } from "@schema/structure.schema";
import { createStructure } from "@services/structures";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorNotification, successNotification } from "@utils/notifications";
import { ClipboardList, FolderDown, FolderInput, UserCog } from "lucide-react";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AgentsCard } from "./Modal/agentsCards";
import { GeneralData } from "./Modal/generalData";
import { ParametersInputForm } from "./Modal/parametersInputForm";
import { ParametersOutputForm } from "./Modal/parametersOutputForm";
interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalStructure: FC<Props> = ({ open, onClose }) => {
  const form = useForm({
    resolver: yupResolver(structureSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const [step, setStep] = useState(1);

  const handleClose = () => {
    onClose();
    reset();
    setStep(1);
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["structure"],
    mutationFn: async (data) => await createStructure(data),
    onSuccess: () => {
      successNotification("Estrutura criada com sucesso");
      handleClose();

      queryClient.invalidateQueries("structures");
    },
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GeneralData />;
      case 2:
        return <ParametersInputForm />;
      case 3:
        return <ParametersOutputForm />;
      case 4:
        return <AgentsCard />;
      default:
        return null;
    }
  };

  const extractError = (errors: object | { message: string }): string => {
    if ((errors as { message: string }).message)
      return (errors as { message: string }).message;

    for (const key in errors) {
      return extractError(errors[key]);
    }

    return "Erro ao criar estrutura";
  };

  const showError = (errors: object | { message: string }) =>
    errorNotification(extractError(errors));

  const textDescription = () => {
    switch (step) {
      case 1:
        return <>Preencha as informações da estrutura</>;
      case 2:
        return (
          <>
            Preencha os parâmetros de entrada da estrutura. Os parâmetros de
            entrada são os valores que a estrutura necessita para funcionar,
            onde caso ele tenha sub-parâmetros o parâmetro pai será uma pasta e
            os sub-parâmetros serão os arquivos dentro dessa pasta.
          </>
        );
      case 3:
        return (
          <>
            Preencha os parâmetros de saída da estrutura. Os parâmetros de saída
            são os valores que a estrutura gera após a execução.
          </>
        );
      case 4:
        return (
          <>
            Preencha os agentes da estrutura. Os agentes são os responsáveis por
            mostrar como processar os dados para cada tipo de agente.
          </>
        );
      default:
        return "";
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-h-dvh h-[100dvh] w-[100dvw] max-w-[100dvw] overflow-y-auto md:h-[650px] md:w-[770px] md:rounded-l-2xl">
        <DialogHeader>
          <DialogTitle>Criar nova estrutura</DialogTitle>
          <DialogDescription>{textDescription()}</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            id="form-structure"
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 4) {
                handleSubmit(mutate as any, (errors) => {
                  if (errors.parameters) {
                    showError(errors.parameters);
                    setStep(2);
                  } else if (errors.outputsParameters) {
                    showError(errors.outputsParameters);
                    setStep(3);
                  } else if (errors.agents) {
                    showError(errors.agents);
                    setStep(4);
                  } else setStep(1);
                })();
              } else {
                setStep(step + 1);
              }
            }}
          >
            <Stepper
              value={step}
              onChange={(value) => setStep(value as number)}
              steps={[
                {
                  icon: <ClipboardList size={24} />,
                  label: "Informações",
                  value: 1,
                },
                {
                  icon: <FolderDown size={24} />,
                  label: "Parâmetros de entrada",
                  value: 2,
                },
                {
                  icon: <FolderInput size={24} />,
                  label: "Parâmetros de saída",
                  value: 3,
                },
                {
                  icon: <UserCog size={24} />,
                  label: "Agentes",
                  value: 4,
                },
              ]}
            />

            <div className="flex flex-col gap-4">{renderStep()}</div>
          </form>
        </FormProvider>
        <DialogFooter>
          <Button
            className="w-full bg-gray-3 text-gray-12"
            disabled={isPending}
            onClick={handleClose}
            id="cancel-structure-button"
            aria-label="Cancelar criação de estrutura"
          >
            Cancelar
          </Button>
          <Button
            className="w-full"
            type="submit"
            form="form-structure"
            loading={isPending}
            id="create-structure-button"
            aria-label="Criar estrutura"
          >
            {step === 4 ? "Criar" : "Próximo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

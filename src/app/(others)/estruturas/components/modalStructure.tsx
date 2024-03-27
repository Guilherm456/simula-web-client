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
import { useMutation } from "@tanstack/react-query";
import { ClipboardList, FolderDown, FolderInput, UserCog } from "lucide-react";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AgentsCard } from "./Modal/agentsCards";
import { GeneralData } from "./Modal/generalData";
import { ParametersInput } from "./Modal/parametersInput";
interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalStructure: FC<Props> = ({ open, onClose }) => {
  const form = useForm({});
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = form;

  const [step, setStep] = useState("1");

  const handleClose = () => {
    onClose();
    reset();
    step("");
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["structure"],
    mutationFn: async (data) => {},
  });

  const renderStep = () => {
    switch (step) {
      case "1":
        return <GeneralData />;
      case "2":
        return <ParametersInput />;
      // case "3":
      //   return <OutputParameters />;
      case "4":
        return <AgentsCard />;
      default:
        return null;
    }
  };

  const textDescription = () => {
    switch (step) {
      case "1":
        return <>Preencha as informações da estrutura</>;
      case "2":
        return (
          <>
            Preencha os parâmetros de entrada da estrutura. Os parâmetros de
            entrada são os valores que a estrutura necessita para funcionar,
            onde caso ele tenha sub-parâmetros o parâmetro pai será uma pasta e
            os sub-parâmetros serão os arquivos dentro dessa pasta.
          </>
        );
      case "3":
        return (
          <>
            Preencha os parâmetros de saída da estrutura. Os parâmetros de saída
            são os valores que a estrutura gera após a execução.
          </>
        );
      case "4":
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
      <DialogContent className="h-screen w-screen overflow-auto md:h-max md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Criar nova estrutura</DialogTitle>
          <DialogDescription>{textDescription()}</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form id="form-structure" className="flex flex-col gap-2">
            <Stepper
              value={step}
              onChange={(value) => setStep(value as string)}
              steps={[
                {
                  icon: <ClipboardList size={24} />,
                  label: "Informações",
                  value: "1",
                },
                {
                  icon: <FolderDown size={24} />,
                  label: "Parâmetros de entrada",
                  value: "2",
                },
                {
                  icon: <FolderInput size={24} />,
                  label: "Parâmetros de saída",
                  value: "3",
                },
                {
                  icon: <UserCog size={24} />,
                  label: "Agentes",
                  value: "4",
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
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

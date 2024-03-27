import { Button, Dialog, DialogContent, DialogTitle } from "@components/ui";
import { FC } from "react";

interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;

  open: boolean;
  onClose: () => void;

  classnameButtonConfirm?: string;
  classnameButtonCancel?: string;

  loading?: boolean;
}

export const Confirmation: FC<Props> = ({
  title,
  description,
  onConfirm,
  onCancel,

  open,
  onClose,

  classnameButtonConfirm,
  classnameButtonCancel = "border border-solid border-gray-10 bg-transparent",

  loading,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="overflow-y-auto md:rounded-l-2xl">
        <DialogTitle>{title}</DialogTitle>
        <p>{description}</p>
        <div className="flex justify-end gap-2 p-4">
          <Button
            className={classnameButtonCancel}
            onClick={() => {
              onCancel?.();
              onClose();
            }}
            disabled={loading}
            id="button-cancel"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            id="button-confirm"
            className={classnameButtonConfirm}
            loading={loading}
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

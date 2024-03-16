import { Button, Dialog, DialogContent, DialogTitle } from "@components/ui";
import { FC } from "react";

interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;

  open: boolean;
  onClose: () => void;
}

export const Confirmation: FC<Props> = ({
  title,
  description,
  onConfirm,
  onCancel,

  open,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <p>{description}</p>
      </DialogContent>
      <div className="flex justify-end gap-2 p-4">
        <Button
          className="border border-solid border-gray-10 bg-none"
          onClick={onCancel}
          id="button-cancel"
        >
          Cancelar
        </Button>
        <Button onClick={onConfirm} id="button-confirm">
          Confirmar
        </Button>
      </div>
    </Dialog>
  );
};

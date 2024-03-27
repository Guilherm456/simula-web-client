"use client";

import { Button } from "@components/ui";
import { Plus } from "lucide-react";
import { FC, useState } from "react";
import { ModalUser } from "./modalUser";

export const ButtonCreateUser: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="w-max gap-2"
        id="button-new-user"
        aria-label="Cadastrar usuário"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-5 w-5 " />
        <span className="hidden md:block">Cadastrar usuário</span>
      </Button>
      <ModalUser open={open} onClose={() => setOpen(false)} />
    </>
  );
};

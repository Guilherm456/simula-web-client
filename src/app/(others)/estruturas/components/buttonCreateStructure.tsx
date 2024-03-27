"use client";

import { Button } from "@components/ui";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ModalStructure } from "./modalStructure";

export const ButtonCreateStructure = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-max gap-2"
        id="button-create-structure"
        aria-label="Abrir modal de criação de estrutura"
      >
        <Plus size={20} />
        <span className="hidden md:block">Criar estrutura</span>
      </Button>

      <ModalStructure open={open} onClose={() => setOpen(false)} />
    </>
  );
};

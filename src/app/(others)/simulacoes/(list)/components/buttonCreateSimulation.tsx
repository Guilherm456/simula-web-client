"use client";

import { Button } from "@components/ui";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ModalSimulation } from "./modalSimulation";

export const ButtonCreateSimulation = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="w-max gap-2"
        onClick={() => setOpen(true)}
        id="button-create-simulation"
      >
        <Plus className="h-5 w-5 " />
        <span className="hidden md:block">Criar simulação</span>
      </Button>
      <ModalSimulation open={open} onClose={() => setOpen(false)} />
    </>
  );
};

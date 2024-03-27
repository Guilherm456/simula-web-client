"use client";

import { Button } from "@components/ui";
import { useAppSelector } from "@utils/hooks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ModalBase } from "./Modal/modalBase";

export const ButtonCreateBase = () => {
  const [open, setOpen] = useState(false);

  const user = useAppSelector((state) => state.login.user);

  if (user?.role === "guest") return null;
  return (
    <>
      <Button className="w-max gap-2" onClick={() => setOpen(true)}>
        <Plus className="h-5 w-5 " />
        <span className="hidden md:block">Criar base</span>
      </Button>
      <ModalBase open={open} onClose={() => setOpen(false)} />
    </>
  );
};

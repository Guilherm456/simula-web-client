"use client";

import { Select, SelectItem } from "@components/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SelectStatus = () => {
  const queries = useSearchParams();
  const [status, setStatus] = useState<string>(
    (queries.get("status") as string) || "all",
  );

  const router = useRouter();

  const pathName = usePathname();

  return (
    <Select
      id="status-select"
      className="h-[3.375rem] w-32"
      placeholder="Selecione o status da simulação"
      value={status}
      onValueChange={(value) => {
        setStatus(value);

        const query = new URLSearchParams(queries);
        if (value === "all") query.delete("status");
        else query.set("status", value);

        router.replace(`${pathName}?${query.toString()}`);
      }}
    >
      <SelectItem value="all" id="select-option-all">
        Todas
      </SelectItem>
      <SelectItem value="PENDING" id="select-option-pending">
        Novas
      </SelectItem>
      <SelectItem value="RUNNING" id="select-option-running">
        Em execução
      </SelectItem>
      <SelectItem value="FINISHED" id="select-option-finished">
        Finalizadas
      </SelectItem>
      <SelectItem value="ERROR" id="select-option-error">
        Erro
      </SelectItem>
    </Select>
  );
};

"use client";

import { Select, SelectItem } from "@components/ui";
import { AgentStructure } from "@models/structure.model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface Props {
  agents: AgentStructure[];
}
export const SelectAgent: FC<Props> = ({ agents }) => {
  const actualAgent = (useSearchParams().get("agent") as string) ?? "all";
  const router = useRouter();

  const pathName = usePathname();

  return (
    <div className="flex w-full justify-end">
      <Select
        label="Agente a ser visualizado "
        placeholder="Selecione o agente"
        id="agent-visualization-select"
        aria-label="Selecione um agente para fazer a visualização"
        value={actualAgent}
        defaultValue="all"
        onValueChange={(value) => {
          if (value === "all") router.replace(pathName);
          else router.replace(`${pathName}?agent=${value}`);
        }}
      >
        {agents.map((agent) => (
          <SelectItem
            key={agent._id}
            value={agent._id}
            id={`select-agent-${agent.name}-option`}
            aria-label={`Selecione o agente ${agent.name} para fazer a visualização`}
          >
            {agent.name}
          </SelectItem>
        ))}
        <SelectItem
          value="all"
          id="select-agent-all-option"
          aria-label="Selecione todos os agentes para fazer a visualização e fazer o comparativo"
        >
          Todos
        </SelectItem>
      </Select>
    </div>
  );
};

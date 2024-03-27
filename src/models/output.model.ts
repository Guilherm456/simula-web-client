import { AgentStructure, Structure } from ".";
import { Simulacao } from "./simulation.model";

export interface AgentOutput {
  agent: string | AgentStructure;
  stats: number[];
}

export interface Output {
  _id: string;
  simulation: string | Simulacao;
  agentsStats: AgentOutput[];
  createdAt: string;
  structure: string | Structure;
  data: object;
}

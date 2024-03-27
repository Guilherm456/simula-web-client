import { Base, Structure } from ".";
import { Output } from "./output.model";

export interface Simulacao {
  name: string;
  base: Base | string;
  status: StatusEnum;
  structure: Structure | string;
  output?: Output | string;
  user: string;
  parameters: object;
  createdAt: string;
  updatedAt?: string;
  _id?: string;
}

export enum StatusEnum {
  "PENDING" = "PENDING",
  "RUNNING" = "RUNNING",
  "FINISHED" = "FINISHED",
  "ERROR" = "ERROR",
}

export interface SimulacaoCreate {
  base: Base;
  name: string;
}

export type SimulacaoUpdate = Pick<SimulacaoCreate, "name">;

import { Base, Structure } from ".";

export interface Simulacao {
  name: string;
  base: Base | string;
  status: StatusEnum;
  structure: Structure | string;
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

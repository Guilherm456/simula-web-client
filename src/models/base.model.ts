import { ParameterDB, Structure, User } from ".";

export interface Base {
  name: string;
  description?: string;
  user: User | string;
  type: Structure | string;
  createdAt: Date;
  updatedAt: Date;
  parameters: ParameterDB;
  _id: string;
}

export interface CreateBaseDTO {
  name: string;
  type: Structure;
  parameters: object;
}

export interface CreateBaseWithFilesDTO extends CreateBaseDTO {
  files: File[];
}

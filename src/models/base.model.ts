import { Structure } from ".";

export interface Base {
  name: string;
  user: string;
  type: {};
  createdAt: Date;
  updatedAt: Date;
  parameters: {
    [key: string]: string;
  };
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

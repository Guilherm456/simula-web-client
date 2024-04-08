import { Structure } from "@models/structure.model";
import { FilterDTO, Pagination } from "@models/utils.model";
import api from "@utils/api";
import { revalidateTags } from "./revalidation";

export const getAllStructures = async (filter?: FilterDTO) => {
  return (await api.get(`/structure`, {
    params: filter,
    next: {
      revalidate: 60 * 15,
      tags: ["structure"],
    },
  })) as Pagination<Structure>;
};

export const getStructure = async (id: string): Promise<Structure> => {
  return await api.get(`/structure/${id}`, {
    next: {
      revalidate: 60 * 15,
      tags: ["structure", id],
    },
  });
};

export const editStructure = async (
  id: string,
  structure: Partial<Structure>,
) => {
  const response = await api.put(`/structure/${id}`, structure);

  revalidateTags(["structure", id]);

  return response;
};

export const createStructure = async (structure: Omit<Structure, "_id">) => {
  const response = await api.post(`/structure`, structure);

  revalidateTags(["structure"]);

  return response;
};

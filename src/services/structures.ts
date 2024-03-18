import { Structure } from "@models/structure.model";
import { FilterDTO, Pagination } from "@models/utils.model";
import api from "@utils/api";

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

import { Structure } from "@models/structure.model";
import { FilterDTO, Pagination } from "@models/utils.model";
import api from "@utils/api";

export const getAllStructures = async (filter?: FilterDTO) => {
  return (await api.get(`/structure`, {
    params: filter,
    next: {
      revalidate: 60 * 15,
    },
  })) as Pagination<Structure>;
};

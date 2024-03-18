import { Parameters } from "@models/parameters.model";
import { FilterDTO, Pagination } from "@models/utils.model";
import api from "@utils/api";

export const getParameter = async (id: string, filter?: FilterDTO) => {
  const response = await api.get(`/parameters/${id}`, {
    next: {
      revalidate: 60 * 10,
      tags: ["parameter", id],
    },
    params: filter,
  });

  return response as Pagination<Parameters>;
};

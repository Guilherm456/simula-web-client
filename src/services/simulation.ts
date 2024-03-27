import {
  Simulacao,
  SimulacaoCreate,
  SimulacaoUpdate,
} from "@models/simulation.model";
import { FilterDTO, Pagination } from "@models/utils.model";
import api from "@utils/api";
import { revalidateTags } from "./revalidation";

export const getSimulations = async (filterDTO?: FilterDTO) => {
  const response = await api.get("/simulacao", {
    params: filterDTO,
    next: {
      revalidate: 60 * 15,
      tags: ["simulacao"],
    },
  });

  return response as Pagination<Simulacao>;
};

export const createSimulation = async ({ base, ...data }: SimulacaoCreate) => {
  const res = await api.post(`/simulacao/${base._id}`, data);

  revalidateTags(["simulacao"]);
  return res as Simulacao;
};

export const getSimulation = async (id: string) => {
  const response = await api.get(`/simulacao/${id}`, {
    next: {
      revalidate: 60 * 15,
      tags: ["simulacao", id],
    },
  });

  return response as Simulacao;
};

export const updateSimulation = async (id: string, data: SimulacaoUpdate) => {
  const response = await api.put(`/simulacao/${id}`, data);

  revalidateTags(["simulacao", id]);

  return response as Simulacao;
};

export const deleteSimulation = async (id: string) => {
  const response = await api.delete(`/simulacao/${id}`);

  revalidateTags(["simulacao", id]);

  return response;
};

export const executeSimulation = async (id: string) => {
  const response = await api.post(`/simulator/${id}/execute`);

  revalidateTags(["simulacao", id]);

  return response;
};

import { AgentOutput, Output } from "@models/output.model";
import api from "@utils/api";

export const getAllData = async (id: string) => {
  const response = await api.get<AgentOutput[]>(`/saida/all/${id}`, {
    next: {
      revalidate: 60 * 15,
      tags: ["output", id],
    },
  });
  return response;
};

export const getDataByAgent = async (id: string, agentID: string) => {
  const response = await api.get<number[]>(`/saida/${id}/${agentID}`, {
    next: {
      revalidate: 60 * 15,
      tags: ["output", id, agentID],
    },
  });
  return response;
};

export const getOutput = async (id: string) => {
  const response = await api.get<Output>(`/saida/${id}`, {
    next: {
      revalidate: 60 * 15,
      tags: ["output", id],
    },
  });
  return response;
};

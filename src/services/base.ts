import {
  Base,
  CreateBaseDTO,
  CreateBaseWithFilesDTO,
} from "@models/base.model";
import { FilterDTO, Pagination } from "@models/utils.model";
import api from "@utils/api";
import { revalidateTags } from "./revalidation";

export const getBases = async (filterDTO?: FilterDTO) => {
  const response = await api.get("/base", {
    params: filterDTO,
    next: {
      revalidate: 60 * 15,
      tags: ["base"],
    },
  });
  return response as Pagination<Base>;
};

export const getBase = async (id: string) => {
  const response = await api.get(`/base/${id}`, {
    next: {
      revalidate: 60 * 15,
      tags: ["base", id],
    },
  });
  return response as Base;
};

export const createBase = async ({ type, ...base }: CreateBaseDTO) => {
  const response = await api.post(`/base/${type?._id}`, {
    ...base,
  });

  revalidateTags(["base"]);

  return response as Base;
};

export const createBaseWithFiles = async ({
  type,
  files,
  name,
}: CreateBaseWithFilesDTO) => {
  const formData = new FormData();
  files?.forEach((file) => formData.append("files", file, file.name));

  const response = await api.post(`/base/files/${type?._id}/${name}`, formData);
  return response as Base;
};

export const updateBase = async (id: string, base: Partial<Base>) => {
  const response = await api.put(`/base/${id}`, base);

  revalidateTags(["base", id]);

  return response as Base;
};

export const deleteBase = async (id: string) => {
  const response = await api.delete(`/base/${id}`);

  revalidateTags(["base", id]);

  return response as Base;
};

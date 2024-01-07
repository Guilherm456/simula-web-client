import {
  Base,
  CreateBaseDTO,
  CreateBaseWithFilesDTO,
} from "@models/base.model";
import { FilterDTO, Pagination } from "@models/utils.model";
import api from "@utils/api";

export const getBases = async (filterDTO?: FilterDTO) => {
  const response = await api.get("/base", {
    params: filterDTO,
    next: {
      revalidate: 60,
    },
  });
  return response as Pagination<Base>;
};

export const createBase = async ({ type, ...base }: CreateBaseDTO) => {
  const response = await api.post(`/base/${type?._id}`, {
    ...base,
  });
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

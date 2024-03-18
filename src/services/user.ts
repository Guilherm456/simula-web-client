import { User } from "@models/user.model";
import { FilterDTO, Pagination } from "@models/utils.model";
import api from "@utils/api";
import { revalidateTags } from "./revalidation";

export const createUser = async (data: User) => {
  const response = await api.post("/users", data);
  revalidateTags(["users"]);
  return response as User;
};

export const userList = async (filterDTO?: FilterDTO) => {
  const response = await api.get("/users", {
    params: filterDTO,
    next: {
      revalidate: 60,
      tags: ["users"],
    },
  });
  return response as Pagination<User>;
};

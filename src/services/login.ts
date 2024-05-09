import { Login, User } from "@models/user.model";
import api from "@utils/api";

export const login = async (body: { email: string; password: string }) => {
  const response = await api.post("/users/login", body);

  return response as Login;
};

export const getUser = async () => {
  const response = await api.get("/users/user");
  return response as User;
};

export const recoverPassword = async (body: { email: string }) => {
  const response = await api.post(`/users/recover-password`, body);
  return response;
};

export const resetPassword = async (body: {
  password: string;
  token: string;
}) => {
  const response = await api.post(`/users/new-password`, body);
  return response;
};

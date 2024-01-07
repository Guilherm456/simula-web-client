// utils/fetchWithAuth.ts

import { getCookie } from "cookies-next";
import { errorNotification } from ".";

type FetchOptions = RequestInit & { params?: { [key: string]: any } };

const isClientSide = (): boolean => typeof window !== "undefined";

const buildQueryString = (params: { [key: string]: any }): string => {
  const query = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== undefined) {
      query.append(key, params[key]);
    }
  }
  return query.toString();
};

const fetchWithAuth = {
  async get<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const queryString = options.params
      ? `?${buildQueryString(options.params)}`
      : "";
    const fullUrl = `${url}${queryString}`;
    return this.request<T>(fullUrl, { ...options, method: "GET" });
  },

  async post<T>(
    url: string,
    body: any,
    options: FetchOptions = {},
  ): Promise<T> {
    // Verifica se o corpo é FormData ou não
    const isFormData = body instanceof FormData;
    const bodyToSend = isFormData ? body : JSON.stringify(body);
    return this.request<T>(url, {
      method: "POST",
      body: bodyToSend,
      ...options,
    });
  },

  async put<T>(url: string, body: any, options: FetchOptions = {}): Promise<T> {
    // Verifica se o corpo é FormData ou não
    const isFormData = body instanceof FormData;
    const bodyToSend = isFormData ? body : JSON.stringify(body);
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: bodyToSend,
    });
  },

  async delete<T>(url: string, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  },

  async request<T>(endpoint: string, options: FetchOptions): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API;
    const url = `${baseUrl}${endpoint}`;

    if (isClientSide()) {
      const token = getCookie("access_token");
      // Preparar os cabeçalhos básicos
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Definir Content-Type para application/json, exceto quando o corpo é FormData
      if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      // Mesclar os cabeçalhos passados com os cabeçalhos padrão
      options.headers = {
        ...headers,
        ...options.headers,
      };
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const error = await response.json();
        throw error ?? "Sem conexão com o servidor";
      }

      if (response.headers.get("Content-Type")?.includes("application/json"))
        return (await response.json()) as T;
      else return null as T;
    } catch (error) {
      if (isClientSide())
        errorNotification(`${error?.message ?? "Sem conexão com o servidor"}`);

      throw error;
    }
  },
};

export default fetchWithAuth;

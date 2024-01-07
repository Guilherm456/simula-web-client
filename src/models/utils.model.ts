export interface Pagination<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export type FilterDTO = {
  nome?: string;
  id?: number;
  [key: string]: any;
} & ListDTO;

export interface ListDTO {
  offset?: number;
  limit?: number;
}

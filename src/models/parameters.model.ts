export interface ParameterDB {
  [key: string]:
    | {
        [key: string]: string;
      }
    | string;
}

export interface Parameter {
  [key: string]: string | number | boolean | object;
}

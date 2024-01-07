export type Roles = "admin" | "user" | "guest";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Roles;
}

export interface Login {
  user: {
    id: string;
    name: string;
    email: string;
    role: Roles;
  };
  maxAge: number;
  access_token: string;
}

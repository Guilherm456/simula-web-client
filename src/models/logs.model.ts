export interface Log {
  date: Date;
  message: string;
  type: "warn" | "error" | "debug" | "log";
  id: string;
}

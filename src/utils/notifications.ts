"use client";
import { ReactNode } from "react";
import { toast } from "sonner";

export const successNotification = (message: string | ReactNode) => {
  toast.success(message);
};

export const errorNotification = (message: string | ReactNode) => {
  toast.error(message);
};

export const infoNotification = (message: string | ReactNode) => {
  toast.info(message);
};

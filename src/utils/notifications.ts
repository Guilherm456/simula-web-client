import { ReactNode } from "react";

export const successNotification = (message: string | ReactNode) => {
  console.debug(message);
};

export const errorNotification = (message: string | ReactNode) => {
  console.debug(message);
};

export const infoNotification = (message: string | ReactNode) => {
  console.info(message);
};

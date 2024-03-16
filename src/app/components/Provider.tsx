"use client";

import { FC, ReactNode, useRef, useState } from "react";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppStore, makeStore } from "@utils/store";

interface Props {
  children: ReactNode;
}

export const ReduxWrapper: FC<Props> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

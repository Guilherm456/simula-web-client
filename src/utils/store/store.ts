import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from ".";
export const makeStore = () => {
  return configureStore({
    reducer: {
      login: loginSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

import { User } from "@models/user.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LoginProps {
  user?: User;
  accessToken?: string;
  isLogged: boolean;
}

const initialState: LoginProps = {
  user: undefined,
  accessToken: undefined,
  isLogged: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<Exclude<LoginProps, "isLogged">>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
    },
    setLogout: (state) => {
      state.user = undefined;
      state.accessToken = undefined;
      state.isLogged = false;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
  },
});

export const { setLogin, setLogout, setUser, setAccessToken, setIsLogged } =
  loginSlice.actions;

export default loginSlice.reducer;

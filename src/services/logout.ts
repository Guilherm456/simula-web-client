"use client";
import { Login } from "@models/user.model";
import { useAppDispatch } from "@utils/hooks";
import { infoNotification, successNotification } from "@utils/notifications";
import { setLogin } from "@utils/store";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    deleteCookie("access_token");
    dispatch(
      setLogin({
        isLogged: false,
        accessToken: "",
        user: undefined,
      }),
    );

    infoNotification("Logout efetuado com sucesso!");
    router.push("/login");
  };

  const login = (data: Login) => {
    setCookie("access_token", data.access_token, {
      maxAge: data.maxAge,
    });

    dispatch(
      setLogin({
        isLogged: true,
        accessToken: data.access_token,
        user: data.user as any,
      }),
    );
    successNotification("Login efetuado com sucesso!");
    router.push("/");
  };

  return {
    logout,
    login,
  };
};

export default useAuth;

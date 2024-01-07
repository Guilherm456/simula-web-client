"use client";

import { getUser } from "@services/login";
import { useAppDispatch, useAppSelector } from "@utils/hooks";
import { setLogin } from "@utils/store";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}
export const Auth: FC<Props> = ({ children }) => {
  const isLogged = useAppSelector((state) => state.login.isLogged);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const pathName = usePathname();

  const checkAuth = async () => {
    if (!isLogged) {
      const token = getCookie("access_token");
      if (token) {
        const user = await getUser();
        dispatch(
          setLogin({
            isLogged: true,
            user,
            accessToken: token,
          }),
        );

        if (pathName.includes("login")) {
          router.push("/");
        }
      } else router.push("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isLogged]);

  return children;
};

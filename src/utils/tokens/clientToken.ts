"use client";

import { getCookie } from "cookies-next";

export const getTokenClientSide = () => getCookie("access_token");

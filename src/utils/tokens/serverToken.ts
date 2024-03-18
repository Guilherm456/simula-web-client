"use server";

import { cookies } from "next/headers";

export const getTokenServerSide = async () =>
  cookies().get("access_token")?.value;

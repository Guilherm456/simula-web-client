"use server";

import { cookies } from "next/headers";

export const getTokenServerSide = () => cookies().get("access_token")?.value;

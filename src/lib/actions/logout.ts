'use server'

import { accessTokenKey } from "@/constants/general";
import { cookies } from "next/headers";

export async function logoutAction() {
    (await cookies()).delete(accessTokenKey);
}
'use  server'

import { connectBankSchema } from "@/constants/schema";
import { AuthFormState } from "@/models/auth";
import { getServerHttp } from "../api/http";
import { USER_QUERY_KEYS } from "../api/user/keys";
import { revalidatePath } from "next/cache";
import { RoutePath } from "@/enums/RoutePath";
import { debugApiClient } from "../utils";
import { redirect, RedirectType } from "next/navigation";


const { USER, CONNECT_BANK } = USER_QUERY_KEYS;

export async function connectBankAction(_: AuthFormState | null, formData: FormData) {
    const parsed = connectBankSchema.safeParse({
      vpa: formData.get('vpa') ?? ''
    });
  
  
    if (!parsed.success) {
      return {
        error: parsed.error.errors[0]?.message || undefined,
        success: false,
      }
    }
  
  
    try {
      const http = await getServerHttp();
      const response = await http.post(`/${USER}/${CONNECT_BANK}`, parsed.data)
      if (!response) {
        return {
          error: 'Missing data',
          success: false,
        }
      }
  
      revalidatePath(RoutePath.Dashboard)
    } catch (e) {
      debugApiClient(e)
      return {
        error: `Failed to kyc process`,
        success: false,
      }
    }
  
    redirect(RoutePath.Dashboard, RedirectType.replace)
  }
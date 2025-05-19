"use server";

import { RoutePath } from "@/enums/RoutePath";
import { AuthFormState } from "@/models/auth";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { loginSchema } from "@/constants/schema";
import { parseAndSetCookieAfterAuth } from "./common";
import { login } from "../api/auth/queries";

export const loginAction = async (
  redirectTo: string | null,
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = loginSchema.safeParse({
    usernameOrEmail: formData.get("usernameOrEmail") ?? "",
    password: formData.get("password") ?? "",
  });

  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || undefined,
      success: false,
    };
  }

  try {
    const { errorMessage, data } = await login(parsed.data);

    if (errorMessage) {
      return {
        error: errorMessage,
        success: false,
      };
    }

    if (!data) {
      return {
        error: "Missing data",
        success: false,
      };
    }

    await parseAndSetCookieAfterAuth(data);
    revalidatePath(redirectTo ?? RoutePath.Dashboard);
  } catch (_) {
    return {
      error: `Failed to login user`,
      success: false,
    };
  }

  redirect(redirectTo ?? RoutePath.Dashboard, RedirectType.replace);
};

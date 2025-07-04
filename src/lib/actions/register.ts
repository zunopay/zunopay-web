"use server";

import { registerSchema } from "@/constants/schema";
import { AuthFormState } from "@/models/auth";
import { parseAndSetCookieAfterAuth } from "./common";
import { revalidatePath } from "next/cache";
import { RoutePath } from "@/enums/RoutePath";
import { debugApiClient } from "../../utils";
import { redirect, RedirectType } from "next/navigation";
import { REDIRECT_TO_KEY } from "@/constants/general";
import { register } from "@/api/auth";

export const registerAction = async (
  redirectTo: string | null,
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = registerSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    referralCode: formData.get("referralCode"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || undefined,
      success: false,
    };
  }

  try {
    const { errorMessage, data } = await register(parsed.data);
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
    revalidatePath(RoutePath.VerifyEmail);
  } catch (e) {
    debugApiClient(e);
    return {
      error: `Failed to register user`,
      success: false,
    };
  }

  const redirectPath = redirectTo
    ? `${RoutePath.VerifyEmail}?${REDIRECT_TO_KEY}=${redirectTo}`
    : RoutePath.VerifyEmail;
  redirect(redirectPath, RedirectType.replace);
};

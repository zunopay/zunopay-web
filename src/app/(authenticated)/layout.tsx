import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { RoutePath } from "@/enums/RoutePath";
import { fetchMe } from "@/api/user/queries";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const {data: user} = await fetchMe ();
  const pathname = (await headers()).get("x-pathname") ?? ""; 

  if (!user) {
    redirect(RoutePath.Login);
  }

  if (!user.isEmailVerified && !pathname.includes(RoutePath.VerifyEmail)) {
    redirect(RoutePath.VerifyEmail);
  }

  return <>{children}</>;
}

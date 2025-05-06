import { LoginForm } from "@/components/forms/LoginForm";
import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout";
import { LogoWithText } from "@/components/shared/logo/LogoWithText";
import { RoutePath } from "@/enums/RoutePath";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <BackgroundWithNameLayout>
      <div className="container flex flex-col gap-5 max-w-[400px] p-10 bg-dark-100 rounded-2xl self-center m-auto opacity-1">
        <LogoWithText />
        <LoginForm />
        <Link href={RoutePath.Register}>
          Not a user ? Click here to register
        </Link>
      </div>
    </BackgroundWithNameLayout>
  );
}

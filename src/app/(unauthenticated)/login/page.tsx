import { LoginForm } from "@/components/forms/LoginForm";
import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout";
import { LogoWithText } from "@/components/shared/logo/LogoWithText";

export default async function LoginPage() {
  return (
    <BackgroundWithNameLayout>
      <div className="container flex flex-col gap-5 max-w-[400px] p-10 bg-dark-100 rounded-2xl self-center m-auto opacity-1">
        <LogoWithText />
        <LoginForm />
      </div>
    </BackgroundWithNameLayout>
  )
}
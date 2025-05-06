import { RegisterForm } from "@/components/forms/RegisterForm";
import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout";
import { LogoWithText } from "@/components/shared/logo/LogoWithText";
import { EARLY_USER_FORM } from "@/constants/general";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <BackgroundWithNameLayout>
      <div className="container flex flex-col gap-5 max-w-[400px] p-10 bg-dark-100 rounded-2xl self-center m-auto opacity-1">
        <LogoWithText />
        <RegisterForm />
        <Link
          href={EARLY_USER_FORM}
          target="_"
          className="underline leading-loose"
        >
          Don&apos;t have referral code ? Click here
        </Link>
      </div>
    </BackgroundWithNameLayout>
  );
}

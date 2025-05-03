import { redirect } from "next/navigation";
import { RoutePath } from "@/enums/RoutePath";
import { fetchMe } from "@/lib/api/user/queries";
import { PrivyContextProvider } from "@/providers/PrivyContextProvider";
import WalletProviderWrapper from "@/components/WalletProviderWrapper";
import { AuthenticationCheckWrapper } from "@/providers/AuthenticationCheckWrapper";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = await fetchMe();

  if (!user) {
    redirect(RoutePath.Login);
  }

  return (
    <PrivyContextProvider appId={process.env.PRIVY_APPLICATION_ID ?? ""}>
      <AuthenticationCheckWrapper>
        <WalletProviderWrapper>{children}</WalletProviderWrapper>
      </AuthenticationCheckWrapper>
    </PrivyContextProvider>
  );
}

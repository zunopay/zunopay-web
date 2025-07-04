import { redirect } from "next/navigation";
import { RoutePath } from "@/enums/RoutePath";
import { PrivyContextProvider } from "@/providers/PrivyContextProvider";
import WalletProviderWrapper from "@/components/WalletProviderWrapper";
import { fetchMe } from "@/api/user";

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
        <WalletProviderWrapper>{children}</WalletProviderWrapper>
    </PrivyContextProvider>
  );
}

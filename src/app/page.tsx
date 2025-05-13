import { Header, HomePageLayout } from "@/components/layout/HomePageLayout";
import { Button, Text } from "@/components/ui";
import { SuperteamIcon } from "@/components/icons/partners/SuperteamIcon";
import { FundlIcon } from "@/components/icons/partners/FundlIcon";
import { SolflareIcon } from "@/components/icons/partners/SolflareIcon";
import { SoulboundDev } from "@/components/icons/partners/SoulboundDev";
import { ProblemSection } from "@/components/home/ProblemSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FooterSection } from "@/components/home/FooterSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <HomePageLayout>
      <div className="flex flex-col min-w-screen min-h-screen justify-between bg-light-gradient p-10 xs:p-6 rounded-b-[32px]">
        <Header />
        <CTASection />
        <div className="flex xs:gap-8 sm:gap-28 self-center">
          <SuperteamIcon className="xs:w-10 sm:w-20 opacity-40" />
          <FundlIcon className="xs:w-16 sm:w-40 opacity-40" />
          <SolflareIcon className="xs:w-16 sm:w-40 opacity-40" />
          <SoulboundDev className="xs:w-28 sm:w-60 opacity-40" />
        </div>
      </div>
      <ProblemSection />
      <FeaturesSection />
      <FooterSection />
    </HomePageLayout>
  );
}

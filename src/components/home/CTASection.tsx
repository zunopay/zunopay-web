'use client'
import { RoutePath } from "@/enums/RoutePath";
import { EARLY_USER_FORM } from "@/constants/general";
import { Button, Text } from "../ui";
import { useRouter } from "next/navigation";
import { ButtonLink } from "../ui/ButtonLink";

export function CTASection() {
  const router = useRouter();

  return (
    <div className="flex flex-col max-w-[882px] self-center gap-14 justify-center">
      <div className="flex flex-col self-center text-center gap-4">
        <Text
          as="span"
          styleVariant="secondary-heading"
          className="sm:text-7xl text-center xs:text-[52px]"
        >
          It’s time for physical shops to introduce stablecoins.
        </Text>
        <Text
          as="span"
          styleVariant="secondary-heading"
          className="xs:text-lg sm:text-2xl opacity-80 font-normal leading-[150%]"
        >
          ZunoPay is a future-proof payment system that empowers merchants.
          Soon, every shop will be able to accept stablecoins with low
          transaction fees.
        </Text>
      </div>

      <div className="flex gap-4 self-center">
        <Button
          variant="ghost"
          className="bg-black text-white"
          onClick={() => router.push(RoutePath.Dashboard)}
        >
          Launch App
        </Button>
        <ButtonLink
          variant="ghost"
          className="border border-white"
          href={EARLY_USER_FORM}
          target="_"
        >
          Contact Us
        </ButtonLink>
      </div>
    </div>
  );
}

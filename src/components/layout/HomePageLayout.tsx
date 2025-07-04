"use client";
import React from "react";
import { cn } from "@/utils";
import { Button, Text } from "../ui";
import { CustomisableLogo } from "../icons/platform/CustomisableLogo";
import { useRouter } from "next/navigation";
import { RoutePath } from "@/enums/RoutePath";
import { ButtonLink } from "../ui/ButtonLink";
import { EARLY_USER_FORM } from "@/constants/general";

type Props = React.PropsWithChildren & {
  mainClassName?: string;
};

export const HomePageLayout: React.FC<Props> = ({
  children,
  mainClassName,
}) => {
  return (
    <main
      className={cn(
        "flex flex-col min-w-screen min-h-screen justify-between bg-dark-100 gap-48",
        mainClassName
      )}
    >
      {children}
    </main>
  );
};

export const Header: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between h-9">
      <div className="flex gap-4 items-center">
        <CustomisableLogo className="h-6 w-6 text-white" />
        <Text as="h4" styleVariant="secondary-heading">
          Zuno<span className="font-extrabold">Pay</span>
        </Text>
      </div>

      <div className="flex gap-4 items-center max-sm:hidden">
        <a href="#problem" className="cursor-pointer">
          <Text as="p" styleVariant="body-normal">
            Problems
          </Text>
        </a>
        <a href="#features" className="cursor-pointer">
          <Text as="p" styleVariant="body-normal">
            Features
          </Text>
        </a>
        <a href="#testimonials" className="cursor-pointer">
          <Text as="p" styleVariant="body-normal">
            Testimonials
          </Text>
        </a>
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
};

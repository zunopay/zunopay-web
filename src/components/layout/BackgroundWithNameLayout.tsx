import React from "react";
import { addTwitter, cn } from "@/lib/utils";
import { Text } from "../ui";
import { XIcon } from "components/icons/platform/XIcon";
import Link from "next/link";
import { BackgroundWithName } from "../shared/BackgroundWithName";

type Props = React.PropsWithChildren & {
  mainClassName?: string;
  showFooter?: boolean;
  backgroundImageSrc?: string;
};

export const BackgroundWithNameLayout: React.FC<Props> = ({
  children,
  mainClassName,
  showFooter
}) => {
  return (
    <main
      className={cn(
        "flex flex-col min-w-screen min-h-screen p-10 xs:p-6 justify-between bg-gradient-to-br from-blue-700 via-blue-600/30 to-blue-600",
        mainClassName
      )}
    >
        <BackgroundWithName />
        {children}
      {showFooter && <FooterWithTwitter/>}
    </main>
  );
};


export const FooterWithTwitter: React.FC = () => {
  return (
    <Link className="flex gap-3 justify-center items-center" href={addTwitter("ZunoPay")}>
        <XIcon className="size-8" />
        <Text as="h5" styleVariant="body-small">
          @ZunoPay
        </Text>
      </Link>
  )
}
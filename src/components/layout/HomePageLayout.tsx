import React from "react";
import { addTwitter, cn } from "@/lib/utils";
import { Text } from "../ui";
import Image from "next/image";
import SHORT_LOGO from "../../../public/Images/short-logo.png";
import { XIcon } from "components/icons/platform/XIcon";
import Link from "next/link";

type Props = React.PropsWithChildren & {
  mainClassName?: string;
  showFooter?: boolean;
  backgroundImageSrc?: string;
};

export const HomePageLayout: React.FC<Props> = ({
  children,
  mainClassName,
}) => {
  return (
    <main
      className={cn(
        "flex flex-col min-w-screen min-h-screen p-10 xs:p-6 justify-between bg-gradient-to-br from-blue-700 via-blue-600/30 to-blue-600",
        mainClassName
      )}
    >
      <div className="flex flex-col md:gap-28 xs:gap-60">
        <Logo/>
        {children}
      </div>

      <Footer/>
    </main>
  );
};

const Logo: React.FC = () => {
  return(
    <div className="flex justify-center w-full">
    <Image src={SHORT_LOGO} alt="zunopay" />
  </div>
  )
}

export const Footer: React.FC = () => {
  return (
    <Link className="flex gap-3 justify-center items-center" href={addTwitter("ZunoPay")}>
        <XIcon className="size-8" />
        <Text as="h5" styleVariant="body-small">
          @ZunoPay
        </Text>
      </Link>
  )
}
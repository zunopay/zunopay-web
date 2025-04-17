import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout";
import { Text } from "@/components/ui";
import { ButtonLink } from "@/components/ui/ButtonLink";
import Image from "next/image";
import SHORT_LOGO from "../../public/Images/short-logo.png";

export default function HomePage() {
  return (
    <BackgroundWithNameLayout showFooter={true} >
      <div className="flex flex-col md:gap-28 xs:gap-60">
        <div className="flex justify-center w-full">
          <Image src={SHORT_LOGO} alt="zunopay" />
        </div>

        <div className="flex flex-col gap-12 max-w-[1500px] items-center">
          <div className="flex flex-col max-w-[1000px] xs:text-center md:text-start w-full">
            <Text
              as="h1"
              styleVariant="secondary-heading"
              className="text-blue-100 lg:leading-[100px] lg:text-[75px] xs:text-[30px]"
            >
              Coming soon.
            </Text>
            <Text
              as="h1"
              styleVariant="secondary-heading"
              className="lg:leading-[100px] lg:text-[75px] xs:text-[30px]"
            >
              Reveal at the Colosseum Breakout Hackathon.
            </Text>
          </div>

          <div className="flex flex-col max-w-[270px] gap-5 md:self-end text-24 xs:items-center">
            <div>
              <Text as="p" styleVariant="body-large" className="md:text-24">
                We&apos;re tirelessly building.
              </Text>
              <Text as="p" styleVariant="body-large" className="md:text-24">
                Reach out to learn more.
              </Text>
            </div>
            <ButtonLink
              className="w-full md:max-w-fit md:text-16 self-start"
              href={"mailto:contact@zunopay.com"}
            >
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </div>
    </BackgroundWithNameLayout>
  );
}

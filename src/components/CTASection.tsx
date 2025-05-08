import { RoutePath } from "@/enums/RoutePath";
import { Text } from "./ui";
import { ButtonLink } from "./ui/ButtonLink";
import { EARLY_USER_FORM } from "@/constants/general";

export function CTASection() {
  return (
    <section id="pricing" className="py-20 hero-gradient m-auto">
      <div className="container mx-auto px-6 text-center">
        <Text
          as="h1"
          styleVariant="secondary-heading"
          className="text-white mb-6 max-w-2xl mx-auto"
        >
          Integrating stablecoins into next-door shops.
        </Text>
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink
            href={RoutePath.Login}
            className="bg-white text-blue-700 hover:bg-grey-100 px-8 py-4"
          >
            Launch App
          </ButtonLink>
          <ButtonLink
            href={EARLY_USER_FORM}
            className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-4"
            target="_"
          >
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

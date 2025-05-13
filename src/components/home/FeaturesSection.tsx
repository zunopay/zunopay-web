import { VariantSvgIconProps } from "@/lib/types";
import { ShopDiscoveryIcon } from "../icons/features/ShopDiscoveryIcon";
import { PaymentIcon } from "../icons/features/PaymentIcon";
import { Text } from "../ui";
import { SettlementIcon } from "../icons/features/SettlementIcon";

export const FeaturesSection = () => {
  return (
    <div className="flex flex-col gap-10 xs:px-5 sm:px-20 max-w-[1500px] self-center w-full">
      <div className="flex justify-between self-center w-full flex-wrap max-sm:flex-col max-sm:gap-4">
        <Text
          as="span"
          styleVariant="secondary-heading"
          className="text-center leading-[120%] xs:text-4xl sm:text-5xl"
        >
          Zuno<span className="font-extrabold">Pay</span> provides
        </Text>
        <Text
          as="p"
          styleVariant="secondary-heading"
          className="leading-[120%] opacity-80 font-normal max-w-[410px] xs:text-lg sm:text-xl"
        >
          Join the financial revolution where customers use crypto as their
          primary payment method.
        </Text>
      </div>

      <div className="flex gap-4 justify-between max-sm:flex-col">
        <FeatureCard
          title="Shop Discovery"
          text="Users will be able to easily find shops that accept stablecoin payments via ZunoPay."
          Icon={ShopDiscoveryIcon}
          iconClassName="w-20 h-20"
        />
        <FeatureCard
          title="Stablecoin payment"
          text="Accept payments with your local interface. No extra steps or new QR codes."
          Icon={PaymentIcon}
          iconClassName="w-16 h-16"
        />
        <FeatureCard
          title="Settlement to fiat"
          text="Quickly and effortlessly offramp your profit from stablecoins to your local currency."
          Icon={SettlementIcon}
          iconClassName="w-20 h-20"
        />
      </div>
    </div>
  );
};

type Props = {
  title: string;
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string; 
};

const FeatureCard: React.FC<Props> = ({ title, text, Icon, iconClassName = "w-16 h-16" }) => {
  return (
    <div className="flex flex-col bg-blue-100 bg-opacity-15 p-8 rounded-xl w-full max-w-[450px] sm:h-[480px] xs:max-h-[480px] gap-6 justify-between" id="features">
      <div className="flex self-start justify-center items-center rounded-full bg-blue-600 p-5 w-32 h-32">
        <Icon className={`${iconClassName} text-white`} />
      </div>
      <div className="flex flex-col gap-4">
        <Text as="h2" styleVariant="secondary-heading" fontWeight="medium" className="text-36">
          {title}
        </Text>
        <Text
          as="p"
          styleVariant="secondary-heading"
          className="leading-[120%] opacity-80 font-normal max-w-80 sm:text-xl xs:text-lg"
        >
          {text}
        </Text>
      </div>
    </div>
  );
};

import { CustomisableLogo } from "../icons/platform/CustomisableLogo";
import { Text } from "../ui";

export const FooterSection: React.FC = () => {
  return (
    <div className="bg-light-gradient flex flex-col gap-6 pt-[72px] rounded-t-3xl px-8 pb-6">
      <div className="flex flex-col gap-6 self-center">
        <Text as="h1" styleVariant="secondary-heading" className="text-center text-[56px]">
          Reach out and get started.
        </Text>
        <Text as="h3" styleVariant="secondary-heading" className="text-center text-32 font-medium">
          contact@zunopay.com
        </Text>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <CustomisableLogo className="h-6 w-6 text-white" />
          <Text as="h4" styleVariant="secondary-heading">
            Zuno<span className="font-extrabold">Pay</span>
          </Text>
        </div>
        <Text as="p" styleVariant="body-normal" className="opacity-80">
          ZunoPay, 2025
        </Text>
      </div>
    </div>
  );
};

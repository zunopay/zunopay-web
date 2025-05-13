import { Text } from "../ui";

export const ProblemSection = () => {
  return (
    <div className="self-center max-w-[800px]" id="problem">
      <Text
        as="p"
        styleVariant="secondary-heading"
        className="text-center leading-[120%] opacity-80 font-normal"
      >
        THE PROBLEM
      </Text>
      <Text
        as="h2"
        styleVariant="secondary-heading"
        className="xs:text-[36px] sm:text-[60px] text-center italic"
      >
        Current payment systems are <span className="text-blue-100">slow</span>,{" "}
        <span className="text-blue-100">expensive</span> &{" "}
        <span className="text-blue-100">limited</span>.
      </Text>
    </div>
  );
};

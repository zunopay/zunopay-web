import { cn } from "@/utils";

export const SoonChip: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <p
      className={cn(
        `bg-blue-100 bg-opacity-30 rounded-md h-fit w-fit px-1 self-center text-blue-100 font-bold font-satoshi text-[14px]`,
        className
      )}
    >
      SOON
    </p>
  );
};

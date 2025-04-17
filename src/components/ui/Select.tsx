import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckCircleIcon, ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";


const labelVariants = cva('text-base text-white')

export const Select = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger ref={forwardedRef} className="flex p-2 justify-between bg-grey-100 border border-grey-100 rounded-lg">
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <ArrowDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content 
          className="overflow-hidden rounded-md border border-dark-200"
          style={{
            background: 'linear-gradient(180deg, rgba(236, 236, 240, 0.04) 0%, rgba(236, 236, 240, 0.00) 100%), linear-gradient(0deg, rgba(236, 236, 240, 0.02) 0%, rgba(236, 236, 240, 0.02) 100%), var(--dark-100, #0A0B24)'
          }}
        >
          <SelectPrimitive.ScrollUpButton>
            <ArrowUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton>
            <ArrowDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

Select.displayName = SelectPrimitive.Root.displayName;

export const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item 
      {...props} 
      ref={forwardedRef} 
      className="flex justify-between m-1 p-2 rounded-md cursor-pointer hover:bg-[#25263C]"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CheckCircleIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = "SelectItem"

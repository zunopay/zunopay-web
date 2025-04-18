import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, VariantProps } from "class-variance-authority";
import { ArrowDownIcon } from "../icons/theme/ArrowDownIcon";
import { ArrowUpIcon } from "../icons/theme/ArrowUpIcon";


const labelVariants = cva('text-base text-white')

export const Select = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ children, ...props }, forwardedRef) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectPrimitive.Root {...props} open={open} onOpenChange={setOpen}>
      <SelectPrimitive.Trigger ref={forwardedRef} className="flex p-2 justify-between bg-grey-100 border-2 border-grey-100 rounded-lg outline-none focus:outline-none focus:ring-0 focus-visible:ring-0"
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          {open ? <ArrowUpIcon className="size-6" /> : <ArrowDownIcon className="size-6"/>}
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content 
         side="bottom"
         align="start"
         position="popper"
         avoidCollisions={false}
          className="min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-grey-100"
          style={{
            background: 'linear-gradient(180deg, rgba(236, 236, 240, 0.04) 0%, rgba(236, 236, 240, 0.00) 100%), linear-gradient(0deg, rgba(236, 236, 240, 0.02) 0%, rgba(236, 236, 240, 0.02) 100%), var(--dark-100, #0A0B24)'
          }}
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
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
      className="flex justify-between m-1 p-2 rounded-md cursor-pointer hover:bg-grey-100 hover:bg-opacity-20 data-[state=checked]:bg-grey-100 data-[state=checked]:bg-opacity-20"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = "SelectItem"

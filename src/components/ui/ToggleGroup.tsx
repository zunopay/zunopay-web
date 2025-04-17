import * as React from "react"
import { Label } from "@radix-ui/react-label"

interface ToggleGroupProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

interface ToggleGroupItemProps {
  label: string
  value: string
  isSelected?: boolean
  onSelect?: VoidFunction
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({ 
  children, 
  value, 
  onValueChange,
  className 
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ToggleGroupItemProps>(child)) {
          return React.cloneElement(child, {
            isSelected: value === child.props.value,
            onSelect: () => onValueChange?.(child.props.value)
          })
        }
        return child
      })}
    </div>
  )
}

export const ToggleGroupItem: React.FC<ToggleGroupItemProps & {
  isSelected?: boolean
  onSelect?: () => void
}> = ({ label, value, isSelected, onSelect }) => {
  return (
    //TODO: Fix styles
    <div className={`flex-1 ${isSelected ? 'bg-[#151629]' : ''}`}>
      <input
        type="radio"
        id={value}
        name="role"
        value={value}
        checked={isSelected}
        onChange={onSelect}
        className="peer hidden"
      />
      <Label 
        htmlFor={value} 
        className="flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium text-muted-foreground peer-checked:text-foreground cursor-pointer"
      >
        {label}
      </Label>
    </div>
  )
}
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
    <div className={`flex ${className}`}>
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
    <div className={`flex-1 p-2 rounded-md bg-grey-200  ${isSelected ? 'bg-gradient-to-b from-grey-200 to-grey-500' : ''}`}>
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
        className="flex w-full justify-center cursor-pointer"
      >
        {label}
      </Label>
    </div>
  )
}
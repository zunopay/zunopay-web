import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { VariantSvgIconProps } from '@/lib/types'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-bold rounded-lg transition-colors hover:brightness-105 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-[2px]',
  {
    variants: {
      variant: {
        primary: 'text-white bg-gradient-to-b from-blue-100/50 to-blue-700/5',
        active: 'text-white bg-blue-600 rounded-md border-dark-200',
        ghost: 'bg-transparent text-inherit p-0 h-auto w-auto backdrop-blur-none',
      },
      size: {
        sm: 'h-9 text-xs py-0.5 px-2 sm:py-1 sm:px-4 gap-1',
        md: 'h-[42px] text-sm py-1 px-3 sm:py-2 sm:px-5 gap-2',
        lg: 'h-[52px] text-base py-2 px-4 sm:py-4 sm:px-6 gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
    compoundVariants: [
      {
        variant: 'ghost',
        size: 'sm',
        class: 'text-xs gap-0',
      },
      {
        variant: 'ghost',
        size: 'md',
        class: 'text-sm gap-0',
      },
      {
        variant: 'ghost',
        size: 'lg',
        class: 'text-base gap-0',
      },
    ],
  }
)


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  Icon?: React.FC<VariantSvgIconProps>
  iconOnly?: boolean
  iconClassName?: string
  iconPosition?: 'left' | 'right'
  solid?: boolean,
}

/**
 * Button component with various style variants and icon support.
 *
 * @component
 * @param {Object} props - The properties that define the button's behavior and appearance.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {'primary'} [props.variant='primary'] - The main style variant of the button.
 * @param {1 | 2 | 3} [props.subVariant=1] - The sub-variant of the chosen main variant.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button.
 * @param {'left' | 'right'} [props.iconPosition='left'] - The position of the icon relative to the text.
 * @param {Icon} [props.icon] - An optional icon component.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 *
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 *
 * @example
 * // With variant and subVariant
 * <Button variant="primary" subVariant={2}>Primary Button</Button>
 *
 * @example
 * // With icon
 * import { MailIcon } from '@/components/icons/MailIcon';
 * <Link href="/contact" Icon={MailIcon}>Contact Us</Link>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = 'md',
      Icon,
      iconPosition = 'left',
      iconClassName,
      iconOnly,
      solid = true,
      children,
      ...props
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 'size-4' : size === 'md' ? 'size-4.5' : 'size-5'

    return (
      <button
        className={cn(
          buttonVariants({ variant, size  }),
          className
        )}
        ref={ref}
        {...props}
      >
        {Icon && iconPosition === 'left' && <Icon className={cn(iconSize, iconClassName, 'shrink-0')} solid={solid} />}
        {!iconOnly && children}
        {Icon && iconPosition === 'right' && <Icon className={cn(iconSize, iconClassName, 'shrink-0')} solid={solid} />}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

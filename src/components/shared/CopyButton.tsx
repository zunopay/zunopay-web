'use client'

import { useCallback } from 'react'
import { Button, ButtonProps } from '@/components/ui/Button'
import { CopyIcon } from 'lucide-react'
import { toast } from '../ui/toast'

type CopyButtonProps = {
  clipboard: string
  text?: string
} & Omit<ButtonProps, 'onClick'>

export const CopyButton: React.FC<CopyButtonProps> = ({ clipboard, text, variant, ...props }) => {
  const handleClick = useCallback(() => {
    if (clipboard) {
      navigator.clipboard.writeText(clipboard)
      toast({ description:'Copied successfully', variant:'default' })
    }
  }, [clipboard])

  return (
    <Button variant={variant} Icon={CopyIcon} onClick={handleClick} solid={false} {...props}>
      {text || ''}
    </Button>
  )
}

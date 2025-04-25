export type ComicCardType = 'large' | 'default'

export type SlugParamsProps = {
  params: Promise<{ slug: string }>
}

export type FileUploadRef = {
  reset: () => void
}

export type SvgIconProps = { className?: React.SVGProps<SVGSVGElement>['className'] }
export type VariantSvgIconProps = { solid?: boolean } & SvgIconProps

export type ReturnResponse<T> = {
  data: T | null
  errorMessage?: string
  status: number
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  INR = "INR",
}

export enum Role {
  Individual = 'Individual',
  Merchant = 'Merchant'
}

export enum SupportedRegion {
  EU = 'EU',
  IN = 'IN',
  BR = 'BR',
  SG = 'SG'
}

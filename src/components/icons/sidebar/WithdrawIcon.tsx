import { VariantSvgIconProps } from "@/lib/types";
import React from "react";

export const WithdrawIcon = React.forwardRef<
  SVGSVGElement,
  VariantSvgIconProps
>(({ solid = false, className }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 20"
      fill={solid ? "currentColor" : "none"}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.91113 4C3.80656 4 2.91113 4.89543 2.91113 6V10C2.91113 11.1046 3.80656 12 4.91113 12L4.91113 6H14.9111C14.9111 4.89543 14.0157 4 12.9111 4H4.91113Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.91113 10C6.91113 8.89543 7.80656 8 8.91113 8H16.9111C18.0157 8 18.9111 8.89543 18.9111 10V14C18.9111 15.1046 18.0157 16 16.9111 16H8.91113C7.80656 16 6.91113 15.1046 6.91113 14V10ZM12.9111 14C14.0157 14 14.9111 13.1046 14.9111 12C14.9111 10.8954 14.0157 10 12.9111 10C11.8066 10 10.9111 10.8954 10.9111 12C10.9111 13.1046 11.8066 14 12.9111 14Z"
        fill="currentColor"
      />
    </svg>
  );
});

WithdrawIcon.displayName = "WithdrawIcon";

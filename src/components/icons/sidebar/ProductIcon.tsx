import { VariantSvgIconProps } from "@/lib/types";
import React from "react";

export const ProductIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
  ({ solid = false, className }, ref) => {
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
          d="M9.96006 3.92707C10.2594 3.00576 11.5628 3.00576 11.8622 3.92707L12.9317 7.21886C13.0656 7.63089 13.4496 7.90985 13.8828 7.90985H17.344C18.3127 7.90985 18.7155 9.14946 17.9318 9.71886L15.1316 11.7533C14.7811 12.008 14.6345 12.4593 14.7683 12.8713L15.8379 16.1631C16.1373 17.0844 15.0828 17.8506 14.2991 17.2812L11.4989 15.2467C11.1484 14.9921 10.6738 14.9921 10.3233 15.2467L7.52316 17.2812C6.73945 17.8506 5.68497 17.0844 5.98432 16.1631L7.05389 12.8713C7.18776 12.4593 7.04111 12.008 6.69062 11.7533L3.89045 9.71886C3.10674 9.14946 3.50951 7.90985 4.47824 7.90985H7.93944C8.37266 7.90985 8.75662 7.63089 8.89049 7.21886L9.96006 3.92707Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);

ProductIcon.displayName = "ProductIcon";

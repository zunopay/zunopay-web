import { VariantSvgIconProps } from "@/lib/types";
import React from "react";

export const HelpCenterIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
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
          d="M18.9111 10C18.9111 13.866 15.3294 17 10.9111 17C9.4195 17 8.02321 16.6428 6.8279 16.0208L2.91113 17L4.24944 13.8773C3.40393 12.7673 2.91113 11.434 2.91113 10C2.91113 6.13401 6.49285 3 10.9111 3C15.3294 3 18.9111 6.13401 18.9111 10Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);

HelpCenterIcon.displayName = "HelpCenterIcon";

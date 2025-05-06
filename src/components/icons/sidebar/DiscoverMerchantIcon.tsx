import { VariantSvgIconProps } from "@/lib/types";
import React from "react";

export const ChangeIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
  ({ solid = false, className }, ref) => {
    return (
      <svg
        ref={ref}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 33 32"
        fill={solid ? "currentColor" : "none"}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.7245 3.05752C16.2452 2.53682 17.0894 2.53682 17.6101 3.05752L29.6101 15.0575C30.1308 15.5782 30.1308 16.4224 29.6101 16.9431C29.0894 17.4638 28.2452 17.4638 27.7245 16.9431L27.334 16.5526V26.667C27.334 28.1398 26.1401 29.3337 24.6673 29.3337H8.66732C7.19456 29.3337 6.00065 28.1398 6.00065 26.667V16.5526L5.61013 16.9431C5.08943 17.4638 4.24521 17.4638 3.72451 16.9431C3.20381 16.4224 3.20381 15.5782 3.72451 15.0575L15.7245 3.05752ZM8.66732 13.8859V26.667H12.6673V21.3337C12.6673 19.8609 13.8612 18.667 15.334 18.667H18.0007C19.4734 18.667 20.6673 19.8609 20.6673 21.3337V26.667H24.6673V13.8859L16.6673 5.88594L8.66732 13.8859ZM18.0007 26.667V21.3337H15.334V26.667H18.0007Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);

ChangeIcon.displayName = "ChangeIcon";

import { VariantSvgIconProps } from "@/lib/types";
import React from "react";

export const HomeIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
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
          d="M11.6182 2.29289C11.2277 1.90237 10.5945 1.90237 10.204 2.29289L3.20403 9.29289C2.8135 9.68342 2.8135 10.3166 3.20403 10.7071C3.59455 11.0976 4.22772 11.0976 4.61824 10.7071L4.91113 10.4142V17C4.91113 17.5523 5.35885 18 5.91113 18H7.91113C8.46342 18 8.91113 17.5523 8.91113 17V15C8.91113 14.4477 9.35885 14 9.91113 14H11.9111C12.4634 14 12.9111 14.4477 12.9111 15V17C12.9111 17.5523 13.3588 18 13.9111 18H15.9111C16.4634 18 16.9111 17.5523 16.9111 17V10.4142L17.204 10.7071C17.5945 11.0976 18.2277 11.0976 18.6182 10.7071C19.0088 10.3166 19.0088 9.68342 18.6182 9.29289L11.6182 2.29289Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);

HomeIcon.displayName = "HomeIcon";

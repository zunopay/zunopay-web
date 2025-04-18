import { VariantSvgIconProps } from "@/lib/types";
import React from "react";

export const TransactionIcon = React.forwardRef<
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
        d="M8.91113 5C8.35885 5 7.91113 5.44771 7.91113 6C7.91113 6.55228 8.35885 7 8.91113 7L14.4969 7L13.204 8.29289C12.8135 8.68342 12.8135 9.31658 13.204 9.70711C13.5946 10.0976 14.2277 10.0976 14.6182 9.70711L17.6182 6.70711C17.8058 6.51957 17.9111 6.26522 17.9111 6C17.9111 5.73478 17.8058 5.48043 17.6182 5.29289L14.6182 2.29289C14.2277 1.90237 13.5946 1.90237 13.204 2.29289C12.8135 2.68342 12.8135 3.31658 13.204 3.70711L14.4969 5L8.91113 5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9111 15C13.4634 15 13.9111 14.5523 13.9111 14C13.9111 13.4477 13.4634 13 12.9111 13L7.32535 13L8.61824 11.7071C9.00876 11.3166 9.00876 10.6834 8.61824 10.2929C8.22772 9.90237 7.59455 9.90237 7.20403 10.2929L4.20403 13.2929C4.01649 13.4804 3.91113 13.7348 3.91113 14C3.91113 14.2652 4.01649 14.5196 4.20403 14.7071L7.20403 17.7071C7.59455 18.0976 8.22772 18.0976 8.61824 17.7071C9.00876 17.3166 9.00876 16.6834 8.61824 16.2929L7.32535 15L12.9111 15Z"
        fill="currentColor"
      />
    </svg>
  );
});

TransactionIcon.displayName = "TransactionIcon";

"use client";

import Image from "next/image";
import { Text } from "../ui";
import { Merchant } from "@/models/user";

export function MerchantCard({ merchant }: { merchant: Merchant }) {
  function openInGoogleMaps(address: string) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, "_blank");
  }

  return (
    <div
      className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-zinc-700 cursor-pointer"
      onClick={() =>
        openInGoogleMaps(`${merchant.displayName} ${merchant.address}`)
      }
    >
      <div className="p-4 flex gap-4">
        <div className="h-16 w-16 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={merchant.cover || ""} //todo: use a default image as placeholder
            alt={`${merchant.displayName} logo`}
            className="max-h-full max-w-full object-contain"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col justify-center overflow-hidden">
          <div className="flex justify-between items-start">
            <Text
              as="h3"
              styleVariant="secondary-heading"
              className="text-white truncate"
            >
              {merchant.displayName}
            </Text>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className="text-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <Text
              as="span"
              styleVariant="body-small"
              className="text-gray-400 mx-1"
            >
              •
            </Text>
            <Text as="span" styleVariant="body-small" className="text-gray-400">
              {merchant.category.charAt(0).toUpperCase() +
                merchant.category.slice(1)}
            </Text>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Text as="p" styleVariant="body-small" className="text-gray-400 mb-3">
          {merchant.address}
        </Text>
      </div>
    </div>
  );
}

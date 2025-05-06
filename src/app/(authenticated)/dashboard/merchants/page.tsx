"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Text } from "@/components/ui/Text";
import { useIsMobile } from "@/hooks/use-mobile";
import { RoutePath } from "@/enums/RoutePath";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { useFetchMe } from "@/api/user/queries";
import { useFetchMerchants } from "@/api/merchant/queries";
import { Merchant, MerchantCategory } from "@/models/merchant";
import { isEmpty } from "lodash";
import Image from "next/image";

export default function MerchantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const isMobile = useIsMobile();

  const { data: user } = useFetchMe();
  const { data: merchants } = useFetchMerchants();

  const filteredMerchants =  merchants?.data?.filter((merchant) => {
    const matchesSearch = isEmpty(searchTerm)  ? true : 
      merchant.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? selectedCategory == "All" || merchant.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    MerchantCategory.Restraunt,
    MerchantCategory.Groceries,
  ];

  if (!user || !user.data) return null;

  return (
    <DashboardLayout user={user?.data} activePath={RoutePath.Merchants}>
      <div className="mb-8">
        <Text
          as="h1"
          styleVariant={isMobile ? "secondary-heading" : "primary-heading"}
          className="text-white mb-2"
        >
          Merchants
        </Text>
        <Text as="p" styleVariant="body-normal" className="text-gray-400">
          Discover nearby merchants that accept ZunoPay
        </Text>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Search merchants or addresses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category, id) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full whitespace-nowrap",
                category === selectedCategory
                  ? "bg-blue-zunopay text-white"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMerchants?.map((merchant) => (
          <MerchantCard key={merchant.id} merchant={merchant} />
        ))}

        {filteredMerchants?.length === 0 && (
          <div className="col-span-full text-center py-16">
            <Text as="p" styleVariant="body-large" className="text-gray-400">
              No merchants found matching your criteria.
            </Text>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function MerchantCard({ merchant }: { merchant: Merchant }) {
  const isMobile = useIsMobile();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-zinc-700">
      <div className="p-4 flex gap-4">
        <div className="h-16 w-16 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={merchant.logo}
            alt={`${merchant.displayName} logo`}
            className="max-h-full max-w-full object-contain"
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
            <Text as="span" styleVariant="body-small" className="text-gray-300">
              4.5
            </Text>
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
        <div className="flex justify-between items-center">
          {/* TODO: Change this to show currently accepting and other to show soon */}
          {true ? (
            <div className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Accepts ZunoPay
            </div>
          ) : (
            <div className="bg-zinc-800 text-gray-400 text-xs px-2 py-1 rounded-full">
              Coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

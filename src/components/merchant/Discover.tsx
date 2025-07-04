"use client";

import React, { useState } from "react";
import { Text } from "@/components/ui/Text";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Input } from "@/components/ui/Input";
import { isEmpty } from "lodash";
import { MerchantCard } from "./MerchantCard";
import { useFetchMerchants } from "@/api/user/queries";

type Props = {
  className?: string;
};

export const MerchantDiscover: React.FC<Props> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const isMobile = useIsMobile();

  const { data: merchants } = useFetchMerchants();

  const filteredMerchants = merchants?.data?.filter((merchant) => {
    const matchesSearch = isEmpty(searchTerm)
      ? true
      : merchant.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? selectedCategory == "All" || merchant.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={className}>
      <div className="mb-8">
        <Text
          as="h1"
          styleVariant={isMobile ? "secondary-heading" : "primary-heading"}
          className="text-white mb-2"
        >
          Shops
        </Text>
        <Text as="p" styleVariant="body-normal" className="text-gray-400">
          Discover nearby merchants that using ZunoPay
        </Text>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Search merchants"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
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
    </div>
  );
};

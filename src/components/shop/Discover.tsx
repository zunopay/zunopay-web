"use client";

import React, { useState } from "react";
import { Text } from "@/components/ui/Text";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { isEmpty } from "lodash";
import { ShopCard } from "./ShopCard";
import { UPCOMING_SHOPS } from "@/constants/shops";
import { useFetchShops } from "@/api/shops/queries";
import { ShopCategory } from "@/models/shop";

type Props = {
    className? : string
}

export const ShopDiscover : React.FC<Props> = ({className}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const isMobile = useIsMobile();

  const { data: shops } = useFetchShops();
  const shop_list = UPCOMING_SHOPS.concat(shops?.data || []);

  const filteredShops = shop_list.filter((shop) => {
    const matchesSearch = isEmpty(searchTerm)
      ? true
      : shop.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? selectedCategory == "All" || shop.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ShopCategory.Restraunt,
    ShopCategory.Groceries,
  ];

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
          Discover nearby shops that accept ZunoPay
        </Text>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Search shops or addresses..."
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
        {filteredShops?.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}

        {filteredShops?.length === 0 && (
          <div className="col-span-full text-center py-16">
            <Text as="p" styleVariant="body-large" className="text-gray-400">
              No shops found matching your criteria.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}

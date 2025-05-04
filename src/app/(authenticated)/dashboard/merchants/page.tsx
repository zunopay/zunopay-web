'use client'

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Text } from "@/components/ui/Text";
import { useIsMobile } from "@/hooks/use-mobile";
import { RoutePath } from "@/enums/RoutePath";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { useFetchMe } from "@/api/user/queries";

export interface Merchant {
    id: number;
    name: string;
    category: "restaurant" | "grocery" | "retail" | "service";
    address: string;
    logoUrl: string;
    acceptsZunoPay: boolean;
    rating?: number;
  }

// This would come from an API in a real application
const mockUser = {
  id: 1,
  username: "johndoe",
  isKycVerified: true,
};

export default function MerchantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const {data: user} = useFetchMe();

  const filteredMerchants = sampleMerchants.filter((merchant) => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          merchant.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? merchant.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", label: "All" },
    { id: "restaurant", label: "Restaurants" },
    { id: "grocery", label: "Grocery" },
    { id: "retail", label: "Retail" },
    { id: "service", label: "Services" },
  ];

  if(!user || !user.data)return null;

  return (
    <DashboardLayout 
      user={user?.data} 
      activePath={RoutePath.Merchants}
    >
      <div className="mb-8">
        <Text as="h1" styleVariant={isMobile ? 'secondary-heading' : 'primary-heading'} className="text-white mb-2">
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
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id === "all" ? null : category.id)}
              className={cn(
                "px-4 py-2 rounded-full whitespace-nowrap",
                category.id === "all" && !selectedCategory ? "bg-blue-zunopay text-white" :
                selectedCategory === category.id ? "bg-blue-zunopay text-white" :
                "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMerchants.map((merchant) => (
          <MerchantCard key={merchant.id} merchant={merchant} />
        ))}
        
        {filteredMerchants.length === 0 && (
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
          <img 
            src={merchant.logoUrl} 
            alt={`${merchant.name} logo`} 
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-center overflow-hidden">
          <div className="flex justify-between items-start">
            <Text as="h3" styleVariant="secondary-heading" className="text-white truncate">
              {merchant.name}
            </Text>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className="text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <Text as="span" styleVariant="body-small" className="text-gray-300">
              {merchant.rating || "N/A"}
            </Text>
            <Text as="span" styleVariant="body-small" className="text-gray-400 mx-1">•</Text>
            <Text as="span" styleVariant="body-small" className="text-gray-400">
              {merchant.category.charAt(0).toUpperCase() + merchant.category.slice(1)}
            </Text>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Text as="p" styleVariant="body-small" className="text-gray-400 mb-3">
          {merchant.address}
        </Text>
        <div className="flex justify-between items-center">
          {merchant.acceptsZunoPay ? (
            <div className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Accepts ZunoPay
            </div>
          ) : (
            <div className="bg-zinc-800 text-gray-400 text-xs px-2 py-1 rounded-full">
              Coming soon
            </div>
          )}
          <button className="text-blue-zunopay hover:underline text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

 const sampleMerchants: Merchant[] = [
  {
    id: 1,
    name: "Al Baik",
    category: "restaurant",
    address: "King Fahd Road, Riyadh, Saudi Arabia",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Albaik_logo.svg/1200px-Albaik_logo.svg.png",
    acceptsZunoPay: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Burger King",
    category: "restaurant",
    address: "Tahlia Street, Jeddah, Saudi Arabia",
    logoUrl: "https://s.cornershopapp.com/images/logos/burger-king-1440x344.jpg",
    acceptsZunoPay: true,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Panda Supermarket",
    category: "grocery",
    address: "Palestine Street, Jeddah, Saudi Arabia",
    logoUrl: "https://seeklogo.com/images/P/panda-supermarket-logo-6276668E70-seeklogo.com.png",
    acceptsZunoPay: true,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Carrefour",
    category: "grocery",
    address: "Red Sea Mall, Jeddah, Saudi Arabia",
    logoUrl: "https://logos-world.net/wp-content/uploads/2022/07/Carrefour-Logo.png",
    acceptsZunoPay: false,
    rating: 4.3,
  },
  {
    id: 5,
    name: "Starbucks",
    category: "restaurant",
    address: "Tahlia Street, Riyadh, Saudi Arabia",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
    acceptsZunoPay: true,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Jarir Bookstore",
    category: "retail",
    address: "King Abdullah Road, Riyadh, Saudi Arabia",
    logoUrl: "https://e7.pngegg.com/pngimages/620/107/png-clipart-jarir-bookstore-logo-jarir-marketing-company-logo-blue-text.png",
    acceptsZunoPay: false,
    rating: 4.7,
  },
];
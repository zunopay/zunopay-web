"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

interface RevenueCardProps {
  title: string;
}

export const RevenueCard: React.FC<RevenueCardProps> = ({ title }) => {
  return (
    <div className="bg-white dark:bg-dark-300 rounded-2xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl border border-black">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Text as="h3" styleVariant="secondary-heading" className="text-black">
            {title}
          </Text>
          <Text as="p" styleVariant="body-small" className="text-black">
            Payment insights
          </Text>
        </div>
        <div className="bg-primary-100 dark:bg-primary-800 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-200" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-baseline">
          <Text as="span"  styleVariant='secondary-heading' className="text-3xl font-bold text-black">
            $548.42
          </Text>
          <Text as="span" styleVariant='secondary-heading' className="ml-2 text-sm font-medium text-green-500">
            +12.5%
          </Text>
        </div>
        <div className="mt-1 flex items-center">
          <Text as="span" styleVariant="body-small" className="text-black">
            {title === "Total Revenue" ? "All time" : "In the last 24 hours"}
          </Text>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-dark-400 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-primary-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: title === "Total Revenue" ? '65%' : '45%' }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <Text as="span" styleVariant="body-small" className="text-gray-500 dark:text-gray-400">
            Target: ${title === "Total Revenue" ? "1,000" : "180"}
          </Text>
          <Text as="span" styleVariant="body-small" className="text-gray-500 dark:text-gray-400">
            {title === "Total Revenue" ? "65%" : "45%"} Completed
          </Text>
        </div>
      </div>
      
      <Button
        variant="ghost"
        className="w-full mt-4 border border-gray-300 text-black  hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        View Details
      </Button>
    </div>
  );
};
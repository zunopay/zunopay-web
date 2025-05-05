'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { SoonChip } from '@/components/shared/SoonChip';
import { cn } from '@/lib/utils';

interface RevenueCardProps {
  title: string;
  className?: string;
}

export const RevenueCard: React.FC<RevenueCardProps> = ({ title, className }) => {
  return (
    <div className={cn(
      "bg-zinc-900 rounded-xl border border-zinc-800 p-6 transform transition-all duration-200 hover:shadow-lg",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <Text as="h3" styleVariant="secondary-heading" className="text-white">
            {title}
          </Text>
          <SoonChip className='text-white'/>
        </div>
        <div className="bg-blue-zunopay/20 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-zunopay" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </div>
      </div>
      
      <Text as="p" styleVariant="body-small" className="text-gray-400 mb-4">
        Payment insights and revenue tracking coming soon to ZunoPay
      </Text>
      
      <div className="mt-4 filter blur-sm pointer-events-none select-none">
        <div className="flex items-baseline">
          <Text as="span" styleVariant='secondary-heading' className="text-3xl font-bold text-white">
            $548.42
          </Text>
          <Text as="span" styleVariant='body-small' className="ml-2 text-sm font-medium text-green-500">
            +12.5%
          </Text>
        </div>
        <div className="mt-1 flex items-center">
          <Text as="span" styleVariant="body-small" className="text-gray-400">
            {title === "Total Revenue" ? "All time" : "In the last 24 hours"}
          </Text>
        </div>
      </div>
      
      <div className="mt-6 bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-zunopay" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <Text as="p" styleVariant="body-small" className="text-gray-300">
              We&apos;re building powerful revenue tracking tools to help you monitor your earnings and reach your financial goals.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

type AchievementBadgeProps = {
  icon: string;
  name: string;
  color: string;
  delay?: number;
  className?: string;
};

export function AchievementBadge({
  icon,
  name,
  color,
  delay = 0,
  className,
}: AchievementBadgeProps) {
  return (
    <motion.div
      className={cn('w-16 h-16 rounded-full flex items-center justify-center', color, className)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 300,
        damping: 15
      }}
      title={name}
    >
      <span className="text-3xl">{icon}</span>
    </motion.div>
  );
}
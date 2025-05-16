'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { motion } from 'framer-motion';
import { Confetti } from '../ui/Confetti';
import { AchievementBadge } from '../AchievementBadge';
import { CommonDialogProps } from '@/lib/types';

type Props = {points: number;
  title?: string;
  message?: string;
  achievement?: string;
} & CommonDialogProps;

// TODO: Add share on twitter
export function PointsDialog({
  open,
  toggleDialog,
  points,
  title = 'Congratulations!',
  message = 'You\'ve earned new points!',
  achievement = 'You completed the daily shopping streak!',
}: Props) {
  const [displayedPoints, setDisplayedPoints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setDisplayedPoints(0);
      const interval = setInterval(() => {
        setDisplayedPoints(prev => {
          const next = prev + Math.ceil(points / 2);
          return next >= points ? points : next;
        });
      }, 50);

      setShowConfetti(true);
      
      return () => clearInterval(interval);
    } else {
      setShowConfetti(false);
    }
  }, [open, points]);

  const defaultBadges = [
    {
      name: 'Star Achievement',
      icon: '⭐',
      color: 'bg-primary/10',
    },
    {
      name: 'Hot Streak',
      icon: '🔥',
      color: 'bg-accent/10',
    }
  ];


  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className="max-w-md rounded-xl overflow-hidden p-0 border-none shadow-xl">
        {showConfetti && <Confetti />}
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DialogTitle className="text-2xl font-bold mb-2">
                {title}
              </DialogTitle>
              <DialogDescription className="text-white/80">
                {message}
              </DialogDescription>
            </motion.div>
          </div>
        </div>
        
        <div className="p-6 text-center">
          <motion.div 
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          >
            <span className="text-6xl font-extrabold bg-clip-text bg-gradient-to-r from-secondary to-accent">
              {displayedPoints}
            </span>
            <span className="text-2xl font-bold text-gray-100 ml-2">POINTS</span>
          </motion.div>
          
          <motion.div 
            className="text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg">{achievement}</p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {defaultBadges.map((badge, index) => (
              <AchievementBadge
                key={index}
                icon={badge.icon}
                name={badge.name}
                color={badge.color}
                delay={0.6 + index * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
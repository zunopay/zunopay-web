'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ConfettiPiece = {
  id: string;
  x: string;
  y: string;
  rotation: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
};

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    const colors = [
      '#6366F1', // primary
      '#F59E0B', // secondary
      '#EC4899', // accent
      '#10B981', // success
      '#8B5CF6', // purple
      '#EF4444', // red
    ];
    
    const newPieces: ConfettiPiece[] = [];
    
    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: `confetti-${i}`,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 20 - 20}%`,
        rotation: Math.random() * 360,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
      });
    }
    
    setPieces(newPieces);
    
    return () => {
      setPieces([]);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: piece.x,
              y: piece.y,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: '100vh',
              rotate: piece.rotation,
              opacity: 0,
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              borderRadius: '50%',
              backgroundColor: piece.color,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// src/components/common/AnimatedHeadline.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedHeadlineProps {
  words: string[];
}

// Container variant: one-time staggered children animation
const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 2, // wait before first word
      staggerChildren: 0.6, // 0.6s between words
      ease: 'easeInOut',
    },
  },
};

// Variants for non-last words: scale and color animated with reverse
const wordVariants: Variants = {
  initial: { scale: 1, color: '#FFFFFF' },
  animate: {
    scale: 1.3,
    color: '#1976d2',
    transition: { duration: 0.3, repeat: 1, repeatType: 'reverse' },
  },
};

// Variants for last word: animate once, scale up then back, color stays blue
const lastWordVariants: Variants = {
  initial: { scale: 1, color: '#FFFFFF' },
  animate: {
    scale: [1, 1.3, 1],
    color: ['#FFFFFF', '#1976d2', '#1976d2'],
    transition: {
      duration: 0.6,
      times: [0, 0.3, 1],
      ease: 'linear',
    },
  },
};

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ words }) => {
  const lastIndex = words.length - 1;
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{ display: 'inline-block' }} // use inline-block so parent text-align controls alignment
    >
      {words.map((word, idx) => {
        const variants = idx === lastIndex ? lastWordVariants : wordVariants;
        return (
          <motion.span
            key={idx}
            variants={variants}
            style={{ marginRight: 8, display: 'inline-block' }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default AnimatedHeadline;

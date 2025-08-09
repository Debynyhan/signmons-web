// src/components/common/AnimatedHeadline.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedHeadlineProps {
  words: string[];
}

// Container variant: keep original timing
const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 2,
      staggerChildren: 0.6,
      ease: 'easeInOut',
    },
  },
};

// Default words: pulse to teal then revert to white
const wordVariants: Variants = {
  initial: { scale: 1, color: '#FFFFFF' },
  animate: {
    scale: 1.3,
    color: '#17EAD9',
    transition: { duration: 0.3, repeat: 1, repeatType: 'reverse' },
  },
};

// Last word (e.g., YOU): pulse teal, end white
const lastWordVariants: Variants = {
  initial: { scale: 1, color: '#FFFFFF' },
  animate: {
    scale: [1, 1.3, 1],
    color: ['#FFFFFF', '#17EAD9', '#FFFFFF'],
    transition: { duration: 0.6, times: [0, 0.3, 1], ease: 'linear' },
  },
};

// BRANDING emphasis: stays teal and bold
const brandingVariants: Variants = {
  initial: { scale: 1, color: '#17EAD9', fontWeight: 800 },
  animate: {
    scale: [1, 1.3, 1],
    color: '#17EAD9',
    fontWeight: 800,
    transition: { duration: 0.6, ease: 'linear' },
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
        const upper = word.toUpperCase();
        const variants =
          upper === 'BRANDING'
            ? brandingVariants
            : idx === lastIndex
              ? lastWordVariants
              : wordVariants;
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

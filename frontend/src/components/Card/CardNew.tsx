import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'hover';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  onClick 
}) => {
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-soft',
    glass: 'glass shadow-soft',
    hover: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-soft card-hover cursor-pointer',
  };

  const Component = variant === 'hover' ? motion.div : 'div';
  const motionProps = variant === 'hover' ? {
    whileHover: { y: -4 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component 
      className={`rounded-xl p-6 ${variants[variant]} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

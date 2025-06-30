import { FC } from 'react';

const SkeletonHeading: FC<{ level?: number; className?: string }> = ({ 
  level = 1, 
  className = '' 
}) => {
  const heightClass = level <= 2 ? 'h-8' : level <= 4 ? 'h-6' : 'h-5';
  const widthClass = level <= 2 ? 'w-3/4' : 'w-2/3';
  
  return (
    <div className={`${heightClass} ${widthClass} bg-gray-300 rounded animate-pulse ${className}`} />
  );
};

export default SkeletonHeading;

import { FC } from 'react';

const SkeletonText: FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`h-4 bg-gray-300 rounded animate-pulse ${className}`} />
);

export default SkeletonText;

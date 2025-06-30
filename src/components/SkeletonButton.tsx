import { FC } from 'react';

const SkeletonButton: FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`h-10 w-24 bg-gray-300 rounded-lg animate-pulse ${className}`} />
);

export default SkeletonButton;

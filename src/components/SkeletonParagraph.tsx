const SkeletonParagraph: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className = '' 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }, (_, i) => (
      <div 
        key={i}
        className={`h-4 bg-gray-300 rounded animate-pulse ${
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`} 
      />
    ))}
  </div>
);

export default SkeletonParagraph;

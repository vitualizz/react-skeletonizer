import { FC, ReactNode } from 'react';
import SkeletonParagraph from './SkeletonParagraph';
import SkeletonHeading from './SkeletonHeading';
import SkeletonButton from './SkeletonButton';
import SkeletonText from './SkeletonText';
import SkeletonImage from './SkeletonImage';
import { useSkeletonTree, SkeletonNode } from '../hooks/useSkeletonTree';

export interface SkeletonizerProps {
  loading: boolean;
  children: ReactNode;
  className?: string;
}

export const Skeletonizer: FC<SkeletonizerProps> = ({ 
  loading, 
  children, 
  className = '' 
}) => {
  const { nodes } = useSkeletonTree(children);

  if (!loading) {
    return <>{children}</>;
  }

  const renderSkeletonNode = (node: SkeletonNode, index: number): ReactNode => {
    const key = `skeleton-${node.depth}-${index}`;
    
    switch (node.type) {
      case 'text':
        return <SkeletonText key={key} className="mb-1" />;
        
      case 'image':
        return (
          <SkeletonImage 
            key={key}
            width={node.originalProps?.width}
            height={node.originalProps?.height || 200}
            className="mb-2"
          />
        );
        
      case 'heading':
        const headingLevel = node.originalProps?.children ? 
          (typeof node.originalProps.children === 'string' ? 1 : 1) : 1;
        return <SkeletonHeading key={key} level={headingLevel} className="mb-3" />;
        
      case 'paragraph':
        const lines = node.hasChildren ? 2 : 1;
        return <SkeletonParagraph key={key} lines={lines} className="mb-2" />;
        
      case 'button':
        return <SkeletonButton key={key} className="mb-2" />;
        
      case 'container':
        return (
          <div key={key} className="mb-2">
            {node.children?.map((child, childIndex) => 
              renderSkeletonNode(child, childIndex)
            )}
          </div>
        );
        
      default:
        return node.hasChildren ? (
          <div key={key} className="mb-1">
            {node.children?.map((child, childIndex) => 
              renderSkeletonNode(child, childIndex)
            )}
          </div>
        ) : (
          <SkeletonText key={key} className="mb-1" />
        );
    }
  };

  return (
    <div className={`animate-pulse ${className}`}>
      {nodes.map((node, index) => renderSkeletonNode(node, index))}
    </div>
  );
};

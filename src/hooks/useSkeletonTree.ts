import { ReactNode, isValidElement, ReactElement, Children } from 'react';

export type NodeType = 'text' | 'image' | 'heading' | 'paragraph' | 'button' | 'container' | 'unknown';

export interface SkeletonNode {
  type: NodeType;
  depth: number;
  hasChildren: boolean;
  originalProps?: Record<string, any>;
  children?: SkeletonNode[];
}

export interface SkeletonTreeMetadata {
  nodes: SkeletonNode[];
  totalDepth: number;
  nodeCount: number;
}

export const useSkeletonTree = (children: ReactNode): SkeletonTreeMetadata => {
  const analyzeNode = (node: ReactNode, depth: number = 0): SkeletonNode[] => {
    if (!node) return [];

    if (Array.isArray(node)) {
      return node.flatMap(child => analyzeNode(child, depth));
    }

    if (typeof node === 'string' || typeof node === 'number') {
      return [{
        type: 'text',
        depth,
        hasChildren: false
      }];
    }

    if (isValidElement(node)) {
      const element = node as ReactElement;
      const tagName = typeof element.type === 'string' ? element.type.toLowerCase() : 'unknown';
      
      const nodeType = getNodeType(tagName);
      const childNodes = element.props.children;
      const hasChildren = childNodes != null && 
        (Array.isArray(childNodes) ? childNodes.length > 0 : true);

      const analyzedChildren = hasChildren 
        ? Children.toArray(childNodes).flatMap(child => analyzeNode(child, depth + 1))
        : [];

      return [{
        type: nodeType,
        depth,
        hasChildren,
        originalProps: element.props,
        children: analyzedChildren
      }];
    }

    return [];
  };

  const getNodeType = (tagName: string): NodeType => {
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) return 'heading';
    if (tagName === 'img') return 'image';
    if (['p', 'span'].includes(tagName)) return 'paragraph';
    if (tagName === 'button') return 'button';
    if (['div', 'section', 'article', 'main', 'aside', 'header', 'footer'].includes(tagName)) return 'container';
    return 'unknown';
  };

  const nodes = analyzeNode(children);
  const maxDepth = nodes.reduce((max, node) => {
    const nodeMaxDepth = getMaxDepth(node);
    return Math.max(max, nodeMaxDepth);
  }, 0);

  const nodeCount = countNodes(nodes);

  return {
    nodes,
    totalDepth: maxDepth,
    nodeCount
  };
};

const getMaxDepth = (node: SkeletonNode): number => {
  if (!node.children || node.children.length === 0) {
    return node.depth;
  }
  return Math.max(node.depth, ...node.children.map(getMaxDepth));
};

const countNodes = (nodes: SkeletonNode[]): number => {
  return nodes.reduce((count, node) => {
    return count + 1 + (node.children ? countNodes(node.children) : 0);
  }, 0);
};


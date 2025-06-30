import React, {
  ReactNode,
  isValidElement,
  cloneElement,
  ReactElement,
  Children,
} from "react"
import { useSkeletonTree } from "../hooks/useSkeletonTree"

type SkeletonizeProps = {
  children: ReactNode
  loading: boolean
  className?: string
}

export const Skeletonize: React.FC<SkeletonizeProps> = ({
  children,
  loading,
  className,
}) => {
  const { metadata } = useSkeletonTree(children)

  if (!loading) return <>{children}</>

  let metaIndex = 0

  const transform = (node: ReactNode): ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      const meta = metadata[metaIndex++]
      return renderByType(meta?.type)
    }

    if (!isValidElement(node)) return null

    const element = node as ReactElement<any>
    const { props } = element

    const childrenTransformed = Children.map(props.children, transform)
    return cloneElement(element, { ...props }, childrenTransformed)
  }

  const renderByType = (type: string | undefined): ReactNode => {
    switch (type) {
      case "image":
        return (
          <div className="bg-gray-300 animate-pulse rounded w-full h-48 mb-4" />
        )
      case "heading":
        return (
          <div className="bg-gray-300 animate-pulse h-5 w-2/3 rounded mb-2" />
        )
      case "paragraph":
        return (
          <div className="bg-gray-300 animate-pulse h-4 w-full rounded mb-2" />
        )
      case "button":
        return (
          <div className="bg-gray-300 animate-pulse h-10 w-32 rounded mb-2" />
        )
      case "text":
        return (
          <div className="bg-gray-300 animate-pulse h-3 w-3/4 rounded mb-2" />
        )
      default:
        return (
          <div className="bg-gray-300 animate-pulse h-4 w-full rounded mb-2" />
        )
    }
  }

  return <div className={className}>{transform(children)}</div>
}


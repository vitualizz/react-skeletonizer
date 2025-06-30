import {
  ReactNode,
  isValidElement,
  ReactElement,
} from "react"

type NodeType =
  | "text"
  | "image"
  | "heading"
  | "paragraph"
  | "button"
  | "unknown"

type SkeletonNodeMeta = {
  type: NodeType
  depth: number
  hasChildren: boolean
}

export const useSkeletonTree = (node: ReactNode) => {
  const metadata: SkeletonNodeMeta[] = []

  const analyze = (node: ReactNode, depth = 0) => {
    if (typeof node === "string" || typeof node === "number") {
      metadata.push({ type: "text", depth, hasChildren: false })
      return
    }

    if (!isValidElement(node)) return

    const element = node as ReactElement<any>
    const { type, props } = element

    const typeString = typeof type === "string" ? type : "custom"
    const hasChildren = Boolean(props?.children)

    let resolvedType: NodeType = "unknown"
    if (typeString === "img") resolvedType = "image"
    else if (/^h[1-6]$/.test(typeString)) resolvedType = "heading"
    else if (typeString === "p" || typeString === "span") resolvedType = "paragraph"
    else if (typeString === "button") resolvedType = "button"
    else if (typeString === "custom") resolvedType = "unknown"

    metadata.push({ type: resolvedType, depth, hasChildren })

    const children = props?.children
    if (children) {
      if (Array.isArray(children)) {
        children.forEach((child) => analyze(child, depth + 1))
      } else {
        analyze(children, depth + 1)
      }
    }
  }

  analyze(node)

  return { metadata }
}

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Skeletonizer: () => Skeletonizer
});
module.exports = __toCommonJS(index_exports);

// src/components/SkeletonParagraph.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var SkeletonParagraph = ({
  lines = 1,
  className = ""
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `space-y-2 ${className}`, children: Array.from({ length: lines }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "div",
  {
    className: `h-4 bg-gray-300 rounded animate-pulse ${i === lines - 1 ? "w-3/4" : "w-full"}`
  },
  i
)) });
var SkeletonParagraph_default = SkeletonParagraph;

// src/components/SkeletonHeading.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var SkeletonHeading = ({
  level = 1,
  className = ""
}) => {
  const heightClass = level <= 2 ? "h-8" : level <= 4 ? "h-6" : "h-5";
  const widthClass = level <= 2 ? "w-3/4" : "w-2/3";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `${heightClass} ${widthClass} bg-gray-300 rounded animate-pulse ${className}` });
};
var SkeletonHeading_default = SkeletonHeading;

// src/components/SkeletonButton.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var SkeletonButton = ({ className = "" }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `h-10 w-24 bg-gray-300 rounded-lg animate-pulse ${className}` });
var SkeletonButton_default = SkeletonButton;

// src/components/SkeletonText.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var SkeletonText = ({ className = "" }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `h-4 bg-gray-300 rounded animate-pulse ${className}` });
var SkeletonText_default = SkeletonText;

// src/components/SkeletonImage.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var SkeletonImage = ({
  width,
  height = 200,
  className = ""
}) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  "div",
  {
    className: `bg-gray-300 rounded animate-pulse flex items-center justify-center ${className}`,
    style: { width: width || "100%", height },
    children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "svg",
      {
        className: "w-12 h-12 text-gray-400",
        fill: "currentColor",
        viewBox: "0 0 20 20",
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { fillRule: "evenodd", d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z", clipRule: "evenodd" })
      }
    )
  }
);
var SkeletonImage_default = SkeletonImage;

// src/hooks/useSkeletonTree.ts
var import_react = require("react");
var useSkeletonTree = (children) => {
  const analyzeNode = (node, depth = 0) => {
    if (!node) return [];
    if (Array.isArray(node)) {
      return node.flatMap((child) => analyzeNode(child, depth));
    }
    if (typeof node === "string" || typeof node === "number") {
      return [{
        type: "text",
        depth,
        hasChildren: false
      }];
    }
    if ((0, import_react.isValidElement)(node)) {
      const element = node;
      const tagName = typeof element.type === "string" ? element.type.toLowerCase() : "unknown";
      const nodeType = getNodeType(tagName);
      const childNodes = element.props.children;
      const hasChildren = childNodes != null && (Array.isArray(childNodes) ? childNodes.length > 0 : true);
      const analyzedChildren = hasChildren ? import_react.Children.toArray(childNodes).flatMap((child) => analyzeNode(child, depth + 1)) : [];
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
  const getNodeType = (tagName) => {
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) return "heading";
    if (tagName === "img") return "image";
    if (["p", "span"].includes(tagName)) return "paragraph";
    if (tagName === "button") return "button";
    if (["div", "section", "article", "main", "aside", "header", "footer"].includes(tagName)) return "container";
    return "unknown";
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
var getMaxDepth = (node) => {
  if (!node.children || node.children.length === 0) {
    return node.depth;
  }
  return Math.max(node.depth, ...node.children.map(getMaxDepth));
};
var countNodes = (nodes) => {
  return nodes.reduce((count, node) => {
    return count + 1 + (node.children ? countNodes(node.children) : 0);
  }, 0);
};

// src/components/Skeletonizer.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var Skeletonizer = ({
  loading,
  children,
  className = ""
}) => {
  const { nodes } = useSkeletonTree(children);
  if (!loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children });
  }
  const renderSkeletonNode = (node, index) => {
    const key = `skeleton-${node.depth}-${index}`;
    switch (node.type) {
      case "text":
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SkeletonText_default, { className: "mb-1" }, key);
      case "image":
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          SkeletonImage_default,
          {
            width: node.originalProps?.width,
            height: node.originalProps?.height || 200,
            className: "mb-2"
          },
          key
        );
      case "heading":
        const headingLevel = node.originalProps?.children ? typeof node.originalProps.children === "string" ? 1 : 1 : 1;
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SkeletonHeading_default, { level: headingLevel, className: "mb-3" }, key);
      case "paragraph":
        const lines = node.hasChildren ? 2 : 1;
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SkeletonParagraph_default, { lines, className: "mb-2" }, key);
      case "button":
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SkeletonButton_default, { className: "mb-2" }, key);
      case "container":
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mb-2", children: node.children?.map(
          (child, childIndex) => renderSkeletonNode(child, childIndex)
        ) }, key);
      default:
        return node.hasChildren ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mb-1", children: node.children?.map(
          (child, childIndex) => renderSkeletonNode(child, childIndex)
        ) }, key) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SkeletonText_default, { className: "mb-1" }, key);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: `animate-pulse ${className}`, children: nodes.map((node, index) => renderSkeletonNode(node, index)) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Skeletonizer
});
//# sourceMappingURL=index.cjs.map
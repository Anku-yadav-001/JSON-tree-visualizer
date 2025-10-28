import { ParsedJSONNode } from "@/types/json.types";
import { TreeNode, TreeEdge, TreeData, LayoutConfig } from "@/types/tree.types";
import { getNodeLabel } from "./jsonParser";

const DEFAULT_LAYOUT: LayoutConfig = {
  horizontalSpacing: 250,
  verticalSpacing: 100,
  nodeWidth: 200,
  nodeHeight: 60,
};

function getNodeColor(type: "object" | "array" | "primitive"): {
  bg: string;
  border: string;
  text: string;
} {
  switch (type) {
    case "object":
      return {
        bg: "bg-blue-500",
        border: "border-blue-600",
       text: "text-white",
      };
    case "array":
      return {
        bg: "bg-green-500",
        border: "border-green-600",
        text: "text-white",
      };
    case "primitive":
      return {
        bg: "bg-orange-500",
        border: "border-orange-600",
        text: "text-white",
      };
  }
}

function calculateLayout(
  node: ParsedJSONNode,
  level: number = 0,
  position: { x: number; y: number } = { x: 0, y: 0 },
  layout: LayoutConfig = DEFAULT_LAYOUT
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  
  positions.set(node.id, { x: position.x, y: position.y });

  if (!node.children || node.children.length === 0) {
    return positions;
  }

  const childCount = node.children.length;
  const totalWidth = (childCount - 1) * layout.horizontalSpacing;
  const startX = position.x - totalWidth / 2;

  node.children.forEach((child, index) => {
    const childX = startX + index * layout.horizontalSpacing;
    const childY = position.y + layout.verticalSpacing;

    const childPositions = calculateLayout(
      child,
      level + 1,
      { x: childX, y: childY },
      layout
    );

    childPositions.forEach((pos, id) => {
      positions.set(id, pos);
    });
  });

  return positions;
}

export function convertToReactFlowElements(
  root: ParsedJSONNode,
  highlightedNodeId?: string
): TreeData {
  const nodes: TreeNode[] = [];
  const edges: TreeEdge[] = [];

  const positions = calculateLayout(root);

  function buildElements(node: ParsedJSONNode) {
    const position = positions.get(node.id) || { x: 0, y: 0 };
    const colors = getNodeColor(node.type);

    const treeNode: TreeNode = {
      id: node.id,
      type: "custom",
      position,
      data: {
        label: getNodeLabel(node),
        value: node.value,
        path: node.path,
        nodeType: node.type,
        isHighlighted: node.id === highlightedNodeId,
        key: node.key,
        parentId: node.parent,
        ...colors,
      },
    };

    nodes.push(treeNode);

    if (node.children) {
      node.children.forEach((child) => {
        edges.push({
          id: `${node.id}-${child.id}`,
          source: node.id,
          target: child.id,
          type: "smoothstep",
          animated: false,
          style: { strokeWidth: 2 },
        });

        buildElements(child);
      });
    }
  }

  buildElements(root);

  return { nodes, edges };
}

export function centerTree(nodes: TreeNode[]): { x: number; y: number } {
  if (nodes.length === 0) return { x: 0, y: 0 };

  const minX = Math.min(...nodes.map((n) => n.position.x));
  const maxX = Math.max(...nodes.map((n) => n.position.x));
  const minY = Math.min(...nodes.map((n) => n.position.y));
  const maxY = Math.max(...nodes.map((n) => n.position.y));

  return {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2,
  };
}
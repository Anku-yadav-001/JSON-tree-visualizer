import { ParsedJSONNode } from "@/types/json.types";
import { TreeNode, TreeEdge, TreeData } from "@/types/tree.types";
import { getNodeLabel } from "./jsonParser";

interface NodePosition {
  x: number;
  y: number;
}

interface LayoutNode {
  node: ParsedJSONNode;
  x: number;
  y: number;
  mod: number;
  children: LayoutNode[];
  parent?: LayoutNode;
}

const SIBLING_SPACING = 80;
const LEVEL_SPACING = 120;
const SUBTREE_SPACING = 40;

function initializeNodes(
  node: ParsedJSONNode,
  parent?: LayoutNode
): LayoutNode {
  const layoutNode: LayoutNode = {
    node,
    x: 0,
    y: 0,
    mod: 0,
    children: [],
    parent,
  };

  if (node.children) {
    layoutNode.children = node.children.map((child) =>
      initializeNodes(child, layoutNode)
    );
  }

  return layoutNode;
}

function calculateInitialX(node: LayoutNode, depth: number = 0): number {
  node.y = depth * LEVEL_SPACING;

  if (node.children.length === 0) {
    node.x = 0;
    return 0;
  }

  if (node.children.length === 1) {
    node.x = calculateInitialX(node.children[0], depth + 1);
    return node.x;
  }

  let leftMost = Infinity;
  let rightMost = -Infinity;

  node.children.forEach((child, index) => {
    const childX = calculateInitialX(child, depth + 1);
    
    if (index > 0) {
      const prevChild = node.children[index - 1];
      const spacing = SIBLING_SPACING + SUBTREE_SPACING;
      child.mod = prevChild.x + prevChild.mod + spacing - childX;
    }

    const finalX = childX + child.mod;
    leftMost = Math.min(leftMost, finalX);
    rightMost = Math.max(rightMost, finalX);
  });

  node.x = (leftMost + rightMost) / 2;
  return node.x;
}

function calculateFinalPositions(
  node: LayoutNode,
  modSum: number = 0,
  positions: Map<string, NodePosition> = new Map()
): Map<string, NodePosition> {
  node.x += modSum;
  positions.set(node.node.id, { x: node.x, y: node.y });

  node.children.forEach((child) => {
    calculateFinalPositions(child, modSum + node.mod, positions);
  });

  return positions;
}

function centerTree(positions: Map<string, NodePosition>): Map<string, NodePosition> {
  const xValues = Array.from(positions.values()).map((p) => p.x);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const centerOffset = -(minX + maxX) / 2;

  const centeredPositions = new Map<string, NodePosition>();
  positions.forEach((pos, id) => {
    centeredPositions.set(id, {
      x: pos.x + centerOffset,
      y: pos.y,
    });
  });

  return centeredPositions;
}

function getNodeColor(type: "object" | "array" | "primitive") {
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

export function convertToReactFlowElements(
  root: ParsedJSONNode,
  highlightedNodeId?: string
): TreeData {
  const nodes: TreeNode[] = [];
  const edges: TreeEdge[] = [];

  const layoutRoot = initializeNodes(root);

  calculateInitialX(layoutRoot);
  let positions = calculateFinalPositions(layoutRoot);
  positions = centerTree(positions);

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
          animated: child.id === highlightedNodeId,
          style: { strokeWidth: 2 },
        });

        buildElements(child);
      });
    }
  }

  buildElements(root);

  return { nodes, edges };
}
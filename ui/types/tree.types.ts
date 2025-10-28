import { Node, Edge } from "reactflow";

export type TreeNode = Node<{
  label: string;
  value?: any;
  path: string;
  nodeType: "object" | "array" | "primitive";
  isHighlighted?: boolean;
  key: string;
  parentId?: string;
}>;

export type TreeEdge = Edge & {
  animated?: boolean;
};

export interface TreeData {
  nodes: TreeNode[];
  edges: TreeEdge[];
}

export interface LayoutConfig {
  horizontalSpacing: number;
  verticalSpacing: number;
  nodeWidth: number;
  nodeHeight: number;
}

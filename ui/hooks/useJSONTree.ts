"use client";

import { useState, useCallback } from "react";
import { ParsedJSONNode } from "@/types/json.types";
import { TreeData } from "@/types/tree.types";
import { buildJSONTree } from "@/lib/jsonParser";
import { convertToReactFlowElements } from "@/lib/treeBuilder";

export const useJSONTree = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [treeRoot, setTreeRoot] = useState<ParsedJSONNode | null>(null);
  const [treeData, setTreeData] = useState<TreeData>({ nodes: [], edges: [] });
  const [highlightedNodeId, setHighlightedNodeId] = useState<string>();

  const generateTree = useCallback((data: any) => {
    setJsonData(data);
    const root = buildJSONTree(data);
    setTreeRoot(root);
    const elements = convertToReactFlowElements(root);
    setTreeData(elements);
    setHighlightedNodeId(undefined);
  }, []);

  const highlightNode = useCallback(
    (nodeId?: string) => {
      setHighlightedNodeId(nodeId);
      if (treeRoot && nodeId) {
        const elements = convertToReactFlowElements(treeRoot, nodeId);
        setTreeData(elements);
      } else if (treeRoot) {
        const elements = convertToReactFlowElements(treeRoot);
        setTreeData(elements);
      }
    },
    [treeRoot]
  );

  const clearTree = useCallback(() => {
    setJsonData(null);
    setTreeRoot(null);
    setTreeData({ nodes: [], edges: [] });
    setHighlightedNodeId(undefined);
  }, []);

  return {
    jsonData,
    treeRoot,
    treeData,
    highlightedNodeId,
    generateTree,
    highlightNode,
    clearTree,
  };
};
"use client";

import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";
import { Controls } from "./Controls";
import { TreeData } from "@/types/tree.types";

const nodeTypes = {
  custom: CustomNode,
};

interface TreeVisualizationInnerProps {
  treeData: TreeData;
  onNodeClick?: (nodeId: string, path: string) => void;
  onDownload?: () => void;
  onReset?: () => void;
}

const TreeVisualizationInner: React.FC<TreeVisualizationInnerProps> = ({
  treeData,
  onNodeClick,
  onDownload,
  onReset,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(treeData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(treeData.edges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    setNodes(treeData.nodes);
    setEdges(treeData.edges);
    
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 300 });
    }, 50);
  }, [treeData, setNodes, setEdges, fitView]);

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: any) => {
      if (onNodeClick) {
        onNodeClick(node.id, node.data.path);
      }
    },
    [onNodeClick]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: false,
          style: { strokeWidth: 2 },
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <Controls onDownload={onDownload} onReset={onReset} />
        
        <Panel position="bottom-left" className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <span className="font-medium">{nodes.length}</span> nodes · {" "}
            <span className="font-medium">{edges.length}</span> edges
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

interface TreeVisualizationProps {
  treeData: TreeData;
  onNodeClick?: (nodeId: string, path: string) => void;
  onDownload?: () => void;
  onReset?: () => void;
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = (props) => {
  return (
    <ReactFlowProvider>
      <TreeVisualizationInner {...props} />
    </ReactFlowProvider>
  );
};
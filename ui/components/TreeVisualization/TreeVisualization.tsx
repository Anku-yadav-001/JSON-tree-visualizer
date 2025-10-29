"use client";

import React, { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
    Background,
    BackgroundVariant,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
    useReactFlow,
    Panel,
    getRectOfNodes,
    getTransformForBounds,
} from "reactflow";
import { toPng } from "html-to-image";
import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";
import { Controls } from "./Controls";
import { TreeData } from "@/types/tree.types";

const nodeTypes = {
    custom: CustomNode,
};

interface TreeVisualizationInnerProps {
    treeData: TreeData;
    highlightedNodeId?: string;
    onNodeClick?: (nodeId: string, path: string) => void;
    onDownload?: () => void;
    onReset?: () => void;
}

const TreeVisualizationInner: React.FC<TreeVisualizationInnerProps> = ({
    treeData,
    highlightedNodeId,
    onNodeClick,
    onDownload,
    onReset,
}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(treeData.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(treeData.edges);
    const { fitView, getNode, setCenter, getNodes } = useReactFlow();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setNodes(treeData.nodes);
        setEdges(treeData.edges);

        setTimeout(() => {
            fitView({ padding: 0.2, duration: 300 });
        }, 50);
    }, [treeData, setNodes, setEdges, fitView]);

    useEffect(() => {
        if (highlightedNodeId) {
            const node = getNode(highlightedNodeId);
            if (node) {
                setCenter(node.position.x, node.position.y, {
                    zoom: 1,
                    duration: 800,
                });
            }
        }
    }, [highlightedNodeId, getNode, setCenter]);

    const handleNodeClick = useCallback(
        (_event: React.MouseEvent, node: any) => {
            if (onNodeClick) {
                onNodeClick(node.id, node.data.path);
            }
        },
        [onNodeClick]
    );

    const handleDownload = useCallback(() => {
        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(
            nodesBounds,
            nodesBounds.width,
            nodesBounds.height,
            0.5,
            2
        );

        const viewport = document.querySelector(
            ".react-flow__viewport"
        ) as HTMLElement;

        if (!viewport) return;

        const edges = viewport.querySelectorAll('.react-flow__edge path');
        const originalStrokes: string[] = [];
        edges.forEach((edge, index) => {
            const pathElement = edge as SVGPathElement;
            originalStrokes[index] = pathElement.style.stroke || '';
            pathElement.style.stroke = '#1e293b';
            pathElement.style.strokeWidth = '2.5';
        });

        toPng(viewport, {
            backgroundColor: "#ffffff",
            width: nodesBounds.width,
            height: nodesBounds.height,
            style: {
                width: `${nodesBounds.width}px`,
                height: `${nodesBounds.height}px`,
                transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
        }).then((dataUrl) => {
            edges.forEach((edge, index) => {
                const pathElement = edge as SVGPathElement;
                pathElement.style.stroke = originalStrokes[index];
                pathElement.style.strokeWidth = '';
            });

            const link = document.createElement("a");
            link.download = `json-tree-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();

            if (onDownload) {
                onDownload();
            }
        }).catch(() => {
            edges.forEach((edge, index) => {
                const pathElement = edge as SVGPathElement;
                pathElement.style.stroke = originalStrokes[index];
                pathElement.style.strokeWidth = '';
            });
        });
    }, [getNodes, onDownload]);

    return (
        <div className="w-full h-full" ref={reactFlowWrapper}>
            <style jsx global>{`
                .react-flow__edge path {
                    stroke: #64748b !important;
                    stroke-width: 2.5 !important;
                }
                
                .react-flow__edge.animated path {
                    stroke: #3b82f6 !important;
                    stroke-width: 3 !important;
                }
                
                .react-flow__edge.animated path.react-flow__edge-path {
                    stroke: #3b82f6 !important;
                }
                
                @media (prefers-color-scheme: dark) {
                    .react-flow__edge path {
                        stroke: #94a3b8 !important;
                    }
                    
                    .react-flow__edge.animated path {
                        stroke: #60a5fa !important;
                    }
                    
                    .react-flow__edge.animated path.react-flow__edge-path {
                        stroke: #60a5fa !important;
                    }
                }
            `}</style>
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
                    style: { 
                        strokeWidth: 2,
                        stroke: "#94a3b8"
                    },
                }}
            >
                <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                <Controls onDownload={handleDownload} onReset={onReset} />

                <Panel position="bottom-left" className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{nodes.length}</span> nodes · {" "}
                        <span className="font-medium text-gray-900 dark:text-gray-100">{edges.length}</span> edges
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
};

interface TreeVisualizationProps {
    treeData: TreeData;
    highlightedNodeId?: string;
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
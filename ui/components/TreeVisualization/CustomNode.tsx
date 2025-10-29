"use client";

import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { cn } from "@/lib/utils";
import { Braces, List, Type } from "lucide-react";

const CustomNode = ({ data }: NodeProps) => {
  const { label, nodeType, isHighlighted } = data;

  const getIcon = () => {
    switch (nodeType) {
      case "object":
        return <Braces className="h-4 w-4" />;
      case "array":
        return <List className="h-4 w-4" />;
      case "primitive":
        return <Type className="h-4 w-4" />;
    }
  };

  const getNodeStyles = () => {
    switch (nodeType) {
      case "object":
        return "bg-blue-500 border-blue-600 text-white hover:bg-blue-600";
      case "array":
        return "bg-green-500 border-green-600 text-white hover:bg-green-600";
      case "primitive":
        return "bg-orange-500 border-orange-600 text-white hover:bg-orange-600";
      default:
        return "bg-gray-500 border-gray-600 text-white";
    }
  };

  return (
    <div
      className={cn(
        "px-4 py-2 rounded-lg border-2 shadow-lg transition-all duration-200 min-w-[180px]",
        getNodeStyles(),
        isHighlighted && "ring-4 ring-yellow-400 ring-opacity-75 scale-110",
        "hover:shadow-xl hover:scale-105 cursor-pointer"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-gray-400 border-2 border-white"
      />
      
      <div className="flex items-center gap-2">
        {getIcon()}
        <div className="font-medium text-sm truncate max-w-[200px]" title={label}>
          {label}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-gray-400 border-2 border-white"
      />
    </div>
  );
};

export default memo(CustomNode);
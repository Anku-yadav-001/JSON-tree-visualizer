"use client";

import React, { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/lib/utils";
import { Braces, List, Type, Copy, Check } from "lucide-react";

const CustomNode = ({ data }: NodeProps) => {
  const { label, nodeType, isHighlighted, path, value } = data;
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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

  const handleCopyPath = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(path);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getValuePreview = () => {
    if (nodeType === "primitive") {
      const valueStr = String(value);
      return valueStr.length > 50 ? valueStr.substring(0, 50) + "..." : valueStr;
    }
    return "";
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={cn(
         "px-4 py-2 rounded-lg border-2 shadow-lg transition-all duration-200 min-w-[180px] relative",
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
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getIcon()}
            <div className="font-medium text-sm truncate" title={label}>
              {label}
            </div>
          </div>
          <button
            onClick={handleCopyPath}
            className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
            title="Copy path"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 !bg-gray-400 border-2 border-white"
        />
      </div>

      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap max-w-xs">
          <div className="font-semibold mb-1">Path: {path}</div>
          {nodeType === "primitive" && value !== undefined && (
            <div className="text-gray-300 dark:text-gray-400">
              Value: {getValuePreview()}
            </div>
          )}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CustomNode);
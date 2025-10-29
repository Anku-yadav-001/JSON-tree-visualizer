"use client";

import React from "react";
import { useReactFlow } from "reactflow";
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "../common/Button";

interface ControlsProps {
  onDownload?: () => void;
  onReset?: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onDownload, onReset }) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 border border-gray-200 dark:border-gray-700">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => zoomIn()}
        title="Zoom In"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => zoomOut()}
        title="Zoom Out"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => fitView({ padding: 0.2, duration: 300 })}
        title="Fit View"
      >
        <Maximize className="h-4 w-4" />
      </Button>

      <div className="border-t border-gray-200 dark:border-gray-700 my-1" />

      {onDownload && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDownload}
          title="Download as Image"
        >
          <Download className="h-4 w-4" />
        </Button>
      )}

      {onReset && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          title="Reset Tree"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
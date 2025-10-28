"use client";

import React, { useState } from "react";
import { useJSONTree } from "@/hooks/useJSONTree";
import { useToast } from "@/hooks/useToasts";
import { JSONInput } from "@/components/JSONInput/JSONInput";
import { ToastContainer } from "@/components/common/Toast";

export default function Home() {
  const { generateTree, treeData, clearTree } = useJSONTree();
  const { toasts, removeToast, success, error } = useToast();

  const handleValidJSON = (data: any) => {
    generateTree(data);
    success("Tree Generated", "JSON tree has been successfully created");
  };

  const handleError = (errorMsg: string) => {
    error("Invalid JSON", errorMsg);
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              JSON Tree Visualizer
            </h1>
            <p className="text-muted-foreground">
              Visualize and explore JSON data as interactive tree structures
            </p>
          </header>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
              <JSONInput onValidJSON={handleValidJSON} onError={handleError} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Tree Visualization</h2>
              {treeData.nodes.length > 0 ? (
                <div className="text-center text-muted-foreground">
                  <p className="mt-2 text-sm">
                    Nodes: {treeData.nodes.length} | Edges: {treeData.edges.length}
                  </p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-20">
                  <p>Generate a tree to see visualization</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}

"use client";

import React from "react";
import { useJSONTree } from "@/hooks/useJSONTree";
import { useSearch } from "@/hooks/useSearch";
import { useToast } from "@/hooks/useToasts";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { JSONInput } from "@/components/JSONInput/JSONInput";
import { TreeVisualization } from "@/components/TreeVisualization/TreeVisualization";
import { ToastContainer } from "@/components/common/Toast";

export default function Home() {
  const { generateTree, treeData, treeRoot, clearTree, highlightNode, highlightedNodeId } = useJSONTree();
  const { searchQuery, searchStatus, performSearch, clearSearch } = useSearch();
  const { toasts, removeToast, success, error, info } = useToast();

  const handleValidJSON = (data: any) => {
    generateTree(data);
    success("Tree Generated", "JSON tree has been successfully created");
  };

  const handleError = (errorMsg: string) => {
    error("Invalid JSON", errorMsg);
  };

  const handleSearch = (query: string) => {
    const result = performSearch(treeRoot, query);
    if (result) {
      highlightNode(result.id);
      success("Match Found", `Found node at path: ${result.path}`);
    } else {
      highlightNode(undefined);
      error("No Match", "Could not find a node matching the search path");
    }
  };

  const handleClearSearch = () => {
    clearSearch();
    highlightNode(undefined);
  };

  const handleNodeClick = (nodeId: string, path: string) => {
    info("Node Selected", `Path: ${path}`);
    console.log("Node clicked:", { nodeId, path });
  };

  const handleReset = () => {
    clearTree();
    clearSearch();
    success("Tree Cleared", "The visualization has been reset");
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              JSON Tree Visualizer
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Visualize and explore JSON data as interactive tree structures
            </p>
          </header>

          <div className="max-w-7xl mx-auto space-y-6">
            {treeData.nodes.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Search Tree</h2>
                <SearchBar
                  onSearch={handleSearch}
                  onClear={handleClearSearch}
                  searchStatus={searchStatus}
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <JSONInput onValidJSON={handleValidJSON} onError={handleError} />
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Tree Visualization</h2>
                {treeData.nodes.length > 0 ? (
                  <div className="h-[600px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <TreeVisualization
                      treeData={treeData}
                      highlightedNodeId={highlightedNodeId}
                      onNodeClick={handleNodeClick}
                      onReset={handleReset}
                    />
                  </div>
                ) : (
                  <div className="h-[600px] flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <svg
                        className="mx-auto h-12 w-12 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-lg font-medium">No Tree Generated</p>
                      <p className="text-sm mt-1">
                        Enter JSON data and click "Generate Tree"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}

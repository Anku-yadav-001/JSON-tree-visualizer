"use client";

import React from "react";
import { useJSONTree } from "@/hooks/useJSONTree";
import { useSearch } from "@/hooks/useSearch";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/hooks/useToasts";
import { Header } from "@/components/Layout/Header";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { JSONInput } from "@/components/JSONInput/JSONInput";
import { TreeVisualization } from "@/components/TreeVisualization/TreeVisualization";
import { ToastContainer } from "@/components/common/Toast";

export default function Home() {
  const { generateTree, treeData, treeRoot, clearTree, highlightNode, highlightedNodeId } = useJSONTree();
  const { searchStatus, performSearch, clearSearch } = useSearch();
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

  const handleNodeClick = async (nodeId: string, path: string) => {
    const copied = await copyToClipboard(path);
    if (copied) {
      success("Path Copied", `Copied to clipboard: ${path}`);
    } else {
      info("Node Selected", `Path: ${path}`);
    }
  };

  const handleReset = () => {
    clearTree();
    clearSearch();
    success("Tree Cleared", "The visualization has been reset");
  };

  const handleDownload = () => {
    success("Downloaded", "Tree image has been downloaded");
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <p className="text-muted-foreground max-w-full mx-auto">
              Paste your JSON data, visualize it as an interactive tree structure, and explore with powerful search capabilities
            </p>
          </div>

          <div className="max-w-12xl mx-auto space-y-6">
            {treeData.nodes.length > 0 && (
              <div className="bg-card rounded-lg shadow-lg p-6 border border-border animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Tree
                </h2>
                <SearchBar
                  onSearch={handleSearch}
                  onClear={handleClearSearch}
                  searchStatus={searchStatus}
                />
              </div>
            )}

          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6">
              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <JSONInput onValidJSON={handleValidJSON} onError={handleError} />
              </div>

              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Tree Visualization
                </h2>
                {treeData.nodes.length > 0 ? (
                  <div className="h-[600px] border border-border rounded-lg overflow-hidden bg-muted">
                    <TreeVisualization
                      treeData={treeData}
                      highlightedNodeId={highlightedNodeId}
                      onNodeClick={handleNodeClick}
                      onReset={handleReset}
                      onDownload={handleDownload}
                    />
                  </div>
                ) : (
                  <div className="h-[600px] flex items-center justify-center border-2 border-dashed border-border rounded-lg bg-muted">
                    <div className="text-center text-muted-foreground p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-xl font-semibold mb-2 text-foreground">No Tree Generated</p>
                      <p className="text-sm mb-6">
                        Enter JSON data on the left and click "Generate Tree" to visualize
                      </p>
                      <div className="flex items-center justify-center gap-6 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded shadow"></div>
                          <span className="font-medium">Objects</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded shadow"></div>
                          <span className="font-medium">Arrays</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-orange-500 rounded shadow"></div>
                          <span className="font-medium">Primitives</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-card rounded-lg p-5 border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Smart Search</h3>
                    <p className="text-sm text-muted-foreground">
                      Search nodes by JSON path with auto-highlight and pan
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-5 border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Interactive Nodes</h3>
                    <p className="text-sm text-muted-foreground">
                      Click nodes to copy paths, hover for detailed information
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-5 border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Export & Share</h3>
                    <p className="text-sm text-muted-foreground">
                      Download tree as image for presentations and documentation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}

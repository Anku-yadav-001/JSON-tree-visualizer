"use client";

import { useState, useCallback } from "react";
import { ParsedJSONNode } from "@/types/json.types";
import { searchByPath, normalizePath } from "@/lib/pathFinder";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<ParsedJSONNode | null>(null);
  const [searchStatus, setSearchStatus] = useState<"idle" | "found" | "not-found">("idle");

  const performSearch = useCallback(
    (root: ParsedJSONNode | null, query: string) => {
      if (!root || !query.trim()) {
        setSearchResult(null);
        setSearchStatus("idle");
        return null;
      }

      const result = searchByPath(root, query);
      setSearchResult(result);
      setSearchStatus(result ? "found" : "not-found");
      
      return result;
    },
    []
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResult(null);
    setSearchStatus("idle");
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResult,
    searchStatus,
    performSearch,
    clearSearch,
  };
};
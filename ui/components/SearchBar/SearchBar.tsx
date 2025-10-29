"use client";

import React, { useState } from "react";
import { Search, X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onClear: () => void;
    searchStatus: "idle" | "found" | "not-found";
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    onClear,
    searchStatus,
    placeholder = "Enter path here...",
}) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    const handleClear = () => {
        setQuery("");
        onClear();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        } else if (e.key === "Escape") {
            handleClear();
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder={placeholder}
                        className="pl-10 pr-10"
                    />
                    {query && (
                        <button
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <Button onClick={handleSearch} disabled={!query.trim()}>
                    Search
                </Button>
            </div>

            {searchStatus !== "idle" && (
                <div
                    className={cn(
                        "flex items-center gap-2 text-sm px-3 py-2 rounded-md",
                        searchStatus === "found"
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                    )}
                >
                    {searchStatus === "found" ? (
                        <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Match found</span>
                        </>
                    ) : (
                        <>
                            <AlertCircle className="h-4 w-4" />
                            <span>No match found</span>
                        </>
                    )}
                </div>
            )}

            <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>
                    <strong>Tip:</strong> Use JSON path format like{" "}
                    <code className="bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-200 px-1 rounded">
                        $.user.name
                    </code>{" "}
                    or{" "}
                    <code className="bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-200 px-1 rounded">
                        $.items[0].name
                    </code>
                </p>
            </div>
        </div>
    );
};
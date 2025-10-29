"use client";

import React from "react";
import { Github } from "lucide-react";
import { Button } from "../common/Button";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                JSON Tree Visualizer
                            </h1>
                            <p className="text-xs text-muted-foreground">Interactive JSON Explorer</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => window.open("https://github.com/Anku-yadav-001/JSON-tree-visualizer", "_blank")} title="View on GitHub">
                            <Github className="h-5 w-5" />
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};
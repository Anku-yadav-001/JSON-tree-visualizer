"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../common/Button";

export const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "dark" : "light");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" disabled>
                <div className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="relative"
        >
            {theme === "light" ? (
                <Sun className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" />
            ) : (
                <Moon className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};
"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark" : "light";

        const initialTheme = storedTheme || systemTheme;

        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return <>{children}</>;
}
"use client";

import { useState, useCallback } from "react";
import { generateId } from "@/lib/utils";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = generateId();
      setToasts((prev) => [...prev, { ...toast, id }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (options: Omit<Toast, "id">) => {
      addToast(options);
    },
    [addToast]
  );

  return {
    toasts,
    toast,
    removeToast,
    success: (title: string, description?: string) =>
      toast({ title, description, type: "success" }),
    error: (title: string, description?: string) =>
      toast({ title, description, type: "error" }),
    warning: (title: string, description?: string) =>
      toast({ title, description, type: "warning" }),
    info: (title: string, description?: string) =>
      toast({ title, description, type: "info" }),
  };
};
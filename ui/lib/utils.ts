import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toPng } from "html-to-image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJSON(json: string): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return json;
  }
}

export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy:", error);
    return false;
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export async function downloadAsImage(
  elementId: string,
  filename: string = "tree.png"
): Promise<boolean> {
  try {
    const element = document.querySelector(`[data-id="${elementId}"]`) as HTMLElement;
    if (!element) {
      console.error("Element not found");
      return false;
    }

    const dataUrl = await toPng(element, {
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();

    return true;
  } catch (error) {
    console.error("Failed to download image:", error);
    return false;
  }
}
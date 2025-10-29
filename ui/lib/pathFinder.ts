import { ParsedJSONNode } from "@/types/json.types";
import { flattenTree } from "./jsonParser";

export function normalizePath(path: string): string {
  let normalized = path.trim();
  
  if (!normalized.startsWith("$")) {
    normalized = "$" + (normalized.startsWith(".") || normalized.startsWith("[") ? "" : ".") + normalized;
  }
  
  return normalized;
}

export function searchByPath(
  root: ParsedJSONNode,
  searchPath: string
): ParsedJSONNode | null {
  const normalized = normalizePath(searchPath);
  const allNodes = flattenTree(root);
  
  return allNodes.find((node) => node.path === normalized) || null;
}

export function searchByKey(
  root: ParsedJSONNode,
  searchKey: string
): ParsedJSONNode[] {
  const allNodes = flattenTree(root);
  const lowerKey = searchKey.toLowerCase();
  
  return allNodes.filter((node) =>
    node.key.toLowerCase().includes(lowerKey)
  );
}

export function searchByValue(
  root: ParsedJSONNode,
  searchValue: string
): ParsedJSONNode[] {
  const allNodes = flattenTree(root);
  const lowerValue = searchValue.toLowerCase();
  
  return allNodes.filter((node) => {
    if (node.type !== "primitive") return false;
    
    const valueStr = String(node.value).toLowerCase();
    return valueStr.includes(lowerValue);
  });
}

export function getAllPaths(root: ParsedJSONNode): string[] {
  const allNodes = flattenTree(root);
  return allNodes.map((node) => node.path);
}

export function pathExists(root: ParsedJSONNode, path: string): boolean {
  return searchByPath(root, path) !== null;
}
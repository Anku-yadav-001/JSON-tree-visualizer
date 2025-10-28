import { JSONValue, ParsedJSONNode, NodeType } from "@/types/json.types";
import { generateId } from "./utils";

export function parseJSON(jsonString: string): {
  success: boolean;
  data?: JSONValue;
  error?: string;
} {
  try {
    const trimmed = jsonString.trim();
    if (!trimmed) {
      return {
        success: false,
        error: "JSON string is empty",
      };
    }

    const data = JSON.parse(trimmed);
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    const message = error.message || "Invalid JSON";
    const match = message.match(/position (\d+)/);
    
    return {
      success: false,
      error: `JSON Parse Error: ${message}`,
    };
  }
}

function getNodeType(value: JSONValue): NodeType {
  if (value === null) return "primitive";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  return "primitive";
}

function getDisplayValue(value: JSONValue): string {
  if (value === null) return "null";
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return value.toString();
  return String(value);
}

export function buildJSONTree(
  data: JSONValue,
  key: string = "$",
  path: string = "$",
  parentId?: string
): ParsedJSONNode {
  const id = generateId();
  const type = getNodeType(data);

  const node: ParsedJSONNode = {
    id,
    type,
    key,
    value: data,
    path,
    parent: parentId,
  };

  if (type === "object" && data !== null) {
    const obj = data as Record<string, JSONValue>;
    node.children = Object.entries(obj).map(([childKey, childValue]) =>
      buildJSONTree(
        childValue,
        childKey,
        `${path}.${childKey}`,
        id
      )
    );
  } else if (type === "array") {
    const arr = data as JSONValue[];
    node.children = arr.map((item, index) =>
      buildJSONTree(
        item,
        `[${index}]`,
        `${path}[${index}]`,
        id
      )
    );
  }

  return node;
}

export function flattenTree(node: ParsedJSONNode): ParsedJSONNode[] {
  const result: ParsedJSONNode[] = [node];

  if (node.children) {
    node.children.forEach((child) => {
      result.push(...flattenTree(child));
    });
  }

  return result;
}

export function findNodeByPath(
  root: ParsedJSONNode,
  path: string
): ParsedJSONNode | null {
  const allNodes = flattenTree(root);
  return allNodes.find((node) => node.path === path) || null;
}

export function getNodeLabel(node: ParsedJSONNode): string {
  if (node.type === "primitive") {
    return `${node.key}: ${getDisplayValue(node.value)}`;
  }
  
  if (node.type === "array") {
    const length = (node.value as JSONValue[]).length;
    return `${node.key} [${length}]`;
  }
  
  if (node.type === "object") {
    const keys = Object.keys(node.value as Record<string, JSONValue>);
    return `${node.key} {${keys.length}}`;
  }
  
  return node.key;
}

export function isValidJSONPath(path: string): boolean {
  const pathRegex = /^\$(\.[a-zA-Z_][a-zA-Z0-9_]*|\[\d+\])*$/;
  return pathRegex.test(path);
}
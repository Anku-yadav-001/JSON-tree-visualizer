export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

export interface JSONObject {
  [key: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}

export type NodeType = "object" | "array" | "primitive";

export interface ParsedJSONNode {
  id: string;
  type: NodeType;
  key: string;
  value: JSONValue;
  path: string;
  children?: ParsedJSONNode[];
  parent?: string;
}

export interface ValidationError {
  message: string;
  line?: number;
  column?: number;
}
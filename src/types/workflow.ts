import type { Node, Edge } from "@xyflow/react";

// ─── Node Categories ─────────────────────────────────────────────
export type NodeCategory =
  | "triggers"
  | "routing"
  | "actions"
  | "conditions"
  | "destinations";

// ─── Node Types ──────────────────────────────────────────────────
export type WorkflowNodeType =
  | "incomingCall"
  | "ivr"
  | "condition"
  | "percentageRoute"
  | "geoRoute"
  | "scheduleRoute"
  | "buyer"
  | "transferCall"
  | "hangUp"
  | "voicemail"
  | "tagCaller"
  | "webhook";

// ─── Node Data ───────────────────────────────────────────────────
export interface BaseNodeData {
  label: string;
  description?: string;
  nodeType: WorkflowNodeType;
  isConfigured: boolean;
  [key: string]: unknown;
}

export interface IncomingCallData extends BaseNodeData {
  nodeType: "incomingCall";
  trackingNumber?: string;
  source?: string;
}

export interface IVRNodeData extends BaseNodeData {
  nodeType: "ivr";
  prompt?: string;
  keys?: { key: string; label: string }[];
  timeout?: number;
  maxRetries?: number;
}

export interface ConditionNodeData extends BaseNodeData {
  nodeType: "condition";
  field?: string;
  operator?: "equals" | "contains" | "startsWith" | "greaterThan" | "lessThan";
  value?: string;
}

export interface PercentageRouteData extends BaseNodeData {
  nodeType: "percentageRoute";
  splits?: { label: string; percentage: number }[];
}

export interface GeoRouteData extends BaseNodeData {
  nodeType: "geoRoute";
  regions?: { region: string; states?: string[] }[];
}

export interface ScheduleRouteData extends BaseNodeData {
  nodeType: "scheduleRoute";
  timezone?: string;
  rules?: { days: string[]; startTime: string; endTime: string }[];
}

export interface BuyerNodeData extends BaseNodeData {
  nodeType: "buyer";
  buyerName?: string;
  concurrencyCap?: number;
  dailyCap?: number;
  revenue?: number;
  weight?: number;
}

export interface TransferCallData extends BaseNodeData {
  nodeType: "transferCall";
  destination?: string;
  timeout?: number;
}

export interface HangUpData extends BaseNodeData {
  nodeType: "hangUp";
  playMessage?: boolean;
  message?: string;
}

export interface VoicemailData extends BaseNodeData {
  nodeType: "voicemail";
  greeting?: string;
  email?: string;
}

export interface TagCallerData extends BaseNodeData {
  nodeType: "tagCaller";
  tags?: string[];
}

export interface WebhookData extends BaseNodeData {
  nodeType: "webhook";
  url?: string;
  method?: "GET" | "POST" | "PUT";
  headers?: Record<string, string>;
}

export type WorkflowNodeData =
  | IncomingCallData
  | IVRNodeData
  | ConditionNodeData
  | PercentageRouteData
  | GeoRouteData
  | ScheduleRouteData
  | BuyerNodeData
  | TransferCallData
  | HangUpData
  | VoicemailData
  | TagCallerData
  | WebhookData;

// ─── React Flow Types ────────────────────────────────────────────
export type WorkflowNode = Node<WorkflowNodeData, WorkflowNodeType>;
export type WorkflowEdge = Edge;

// ─── Node Palette Entry ──────────────────────────────────────────
export interface NodePaletteItem {
  type: WorkflowNodeType;
  label: string;
  description: string;
  category: NodeCategory;
  icon: string;
  color: string;
}

// ─── Workflow Definition ─────────────────────────────────────────
export interface WorkflowDefinition {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

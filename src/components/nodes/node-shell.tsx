"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";
import {
  PhoneIncoming,
  ListTree,
  GitBranch,
  PieChart,
  Globe,
  Clock,
  User,
  PhoneForwarded,
  PhoneOff,
  Mic,
  Tag,
  Webhook,
} from "lucide-react";
import type { WorkflowNodeType } from "@/types/workflow";

const iconMap: Record<WorkflowNodeType, React.ComponentType<{ size?: number; className?: string }>> = {
  incomingCall: PhoneIncoming,
  ivr: ListTree,
  condition: GitBranch,
  percentageRoute: PieChart,
  geoRoute: Globe,
  scheduleRoute: Clock,
  buyer: User,
  transferCall: PhoneForwarded,
  hangUp: PhoneOff,
  voicemail: Mic,
  tagCaller: Tag,
  webhook: Webhook,
};

const colorMap: Record<WorkflowNodeType, string> = {
  incomingCall: "#22C55E",
  ivr: "#3B82F6",
  condition: "#EF4444",
  percentageRoute: "#8B5CF6",
  geoRoute: "#06B6D4",
  scheduleRoute: "#F59E0B",
  buyer: "#F97316",
  transferCall: "#10B981",
  hangUp: "#DC2626",
  voicemail: "#14B8A6",
  tagCaller: "#EC4899",
  webhook: "#64748B",
};

interface NodeShellProps {
  nodeType: WorkflowNodeType;
  label: string;
  isConfigured: boolean;
  selected?: boolean;
  children?: React.ReactNode;
  sourceHandles?: { id: string; label: string }[];
  hideTarget?: boolean;
  hideSource?: boolean;
}

export function NodeShell({
  nodeType,
  label,
  isConfigured,
  selected,
  children,
  sourceHandles,
  hideTarget,
  hideSource,
}: NodeShellProps) {
  const Icon = iconMap[nodeType];
  const color = colorMap[nodeType];

  return (
    <div
      className={`
        min-w-[220px] max-w-[280px] bg-white rounded-xl shadow-lg border-2 transition-all
        ${selected ? "border-blue-500 shadow-blue-100" : "border-gray-200"}
        ${!isConfigured ? "border-dashed" : ""}
      `}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-t-[10px]"
        style={{ backgroundColor: `${color}15` }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: color }}
        >
          <Icon size={16} className="text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-gray-900 truncate">
            {label}
          </div>
        </div>
        {isConfigured && (
          <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
        )}
      </div>

      {/* Body */}
      {children && (
        <div className="px-3 py-2 text-xs text-gray-600 border-t border-gray-100">
          {children}
        </div>
      )}

      {/* Input handle */}
      {!hideTarget && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
        />
      )}

      {/* Output handle(s) */}
      {!hideSource && !sourceHandles && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
        />
      )}

      {sourceHandles &&
        sourceHandles.map((handle, idx) => (
          <Handle
            key={handle.id}
            id={handle.id}
            type="source"
            position={Position.Right}
            className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
            style={{
              top: `${((idx + 1) / (sourceHandles.length + 1)) * 100}%`,
            }}
          />
        ))}
    </div>
  );
}

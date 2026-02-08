"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { WebhookData } from "@/types/workflow";

type Props = NodeProps & { data: WebhookData };

export function WebhookNode({ data, selected }: Props) {
  return (
    <NodeShell
      nodeType="webhook"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
    >
      {data.url ? (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-bold">
              {data.method || "POST"}
            </span>
            <span className="font-mono text-gray-800 truncate text-[10px]">
              {data.url}
            </span>
          </div>
        </div>
      ) : (
        <span className="text-gray-400 italic">No URL configured</span>
      )}
    </NodeShell>
  );
}

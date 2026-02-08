"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { IVRNodeData } from "@/types/workflow";

type Props = NodeProps & { data: IVRNodeData };

export function IVRNode({ data, selected }: Props) {
  const sourceHandles = data.keys?.map((k) => ({
    id: `key-${k.key}`,
    label: `Press ${k.key}: ${k.label}`,
  }));

  return (
    <NodeShell
      nodeType="ivr"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
      sourceHandles={sourceHandles}
    >
      {data.keys && data.keys.length > 0 && (
        <div className="space-y-1">
          {data.keys.map((k) => (
            <div
              key={k.key}
              className="flex items-center gap-2"
            >
              <span className="inline-flex w-5 h-5 rounded bg-blue-100 text-blue-700 font-bold text-[10px] items-center justify-center">
                {k.key}
              </span>
              <span>{k.label}</span>
            </div>
          ))}
        </div>
      )}
      {data.timeout && (
        <div className="mt-1 text-gray-400">Timeout: {data.timeout}s</div>
      )}
    </NodeShell>
  );
}

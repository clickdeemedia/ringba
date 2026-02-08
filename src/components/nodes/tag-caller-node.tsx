"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { TagCallerData } from "@/types/workflow";

type Props = NodeProps & { data: TagCallerData };

export function TagCallerNode({ data, selected }: Props) {
  return (
    <NodeShell
      nodeType="tagCaller"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
    >
      {data.tags && data.tags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 bg-pink-100 text-pink-700 rounded text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-gray-400 italic">No tags set</span>
      )}
    </NodeShell>
  );
}

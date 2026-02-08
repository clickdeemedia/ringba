"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { PercentageRouteData } from "@/types/workflow";

type Props = NodeProps & { data: PercentageRouteData };

export function PercentageRouteNode({ data, selected }: Props) {
  const sourceHandles = data.splits?.map((s, i) => ({
    id: `split-${i}`,
    label: `${s.label} (${s.percentage}%)`,
  }));

  return (
    <NodeShell
      nodeType="percentageRoute"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
      sourceHandles={sourceHandles}
    >
      {data.splits && data.splits.length > 0 && (
        <div className="space-y-1.5">
          {data.splits.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-purple-500 h-full rounded-full"
                  style={{ width: `${s.percentage}%` }}
                />
              </div>
              <span className="font-medium w-10 text-right">
                {s.percentage}%
              </span>
            </div>
          ))}
        </div>
      )}
    </NodeShell>
  );
}

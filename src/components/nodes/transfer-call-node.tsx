"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { TransferCallData } from "@/types/workflow";

type Props = NodeProps & { data: TransferCallData };

export function TransferCallNode({ data, selected }: Props) {
  return (
    <NodeShell
      nodeType="transferCall"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
      hideSource
    >
      {data.destination && (
        <div className="flex items-center justify-between">
          <span className="text-gray-500">To</span>
          <span className="font-mono font-medium text-gray-800">
            {data.destination}
          </span>
        </div>
      )}
      {data.timeout && (
        <div className="flex items-center justify-between mt-1">
          <span className="text-gray-500">Timeout</span>
          <span className="text-gray-800">{data.timeout}s</span>
        </div>
      )}
    </NodeShell>
  );
}

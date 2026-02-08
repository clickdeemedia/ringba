"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { IncomingCallData } from "@/types/workflow";

type Props = NodeProps & { data: IncomingCallData };

export function IncomingCallNode({ data, selected }: Props) {
  return (
    <NodeShell
      nodeType="incomingCall"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
      hideTarget
    >
      {data.trackingNumber && (
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Number</span>
          <span className="font-mono font-medium text-gray-800">
            {data.trackingNumber}
          </span>
        </div>
      )}
      {data.source && (
        <div className="flex items-center justify-between mt-1">
          <span className="text-gray-500">Source</span>
          <span className="font-medium text-gray-800">{data.source}</span>
        </div>
      )}
    </NodeShell>
  );
}

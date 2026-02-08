"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { ConditionNodeData } from "@/types/workflow";

type Props = NodeProps & { data: ConditionNodeData };

export function ConditionNode({ data, selected }: Props) {
  return (
    <NodeShell
      nodeType="condition"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
      sourceHandles={[
        { id: "true", label: "True" },
        { id: "false", label: "False" },
      ]}
    >
      {data.field && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Field</span>
            <span className="font-medium text-gray-800">{data.field}</span>
          </div>
          {data.operator && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Operator</span>
              <span className="font-medium text-gray-800">
                {data.operator}
              </span>
            </div>
          )}
          {data.value && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Value</span>
              <span className="font-medium text-gray-800">{data.value}</span>
            </div>
          )}
        </div>
      )}
    </NodeShell>
  );
}

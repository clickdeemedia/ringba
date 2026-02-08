"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { BuyerNodeData } from "@/types/workflow";

type Props = NodeProps & { data: BuyerNodeData };

export function BuyerNode({ data, selected }: Props) {
  return (
    <NodeShell
      nodeType="buyer"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
      hideSource
    >
      <div className="space-y-1">
        {data.buyerName && (
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Buyer</span>
            <span className="font-medium text-gray-800">{data.buyerName}</span>
          </div>
        )}
        {data.revenue !== undefined && data.revenue > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Revenue</span>
            <span className="font-medium text-green-600">
              ${data.revenue}
            </span>
          </div>
        )}
        <div className="flex gap-3 mt-1">
          {data.concurrencyCap !== undefined && (
            <div className="text-[10px] text-gray-400">
              CC: {data.concurrencyCap}
            </div>
          )}
          {data.dailyCap !== undefined && (
            <div className="text-[10px] text-gray-400">
              Daily: {data.dailyCap}
            </div>
          )}
          {data.weight !== undefined && (
            <div className="text-[10px] text-gray-400">
              Wt: {data.weight}
            </div>
          )}
        </div>
      </div>
    </NodeShell>
  );
}

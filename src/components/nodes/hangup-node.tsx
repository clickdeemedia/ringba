"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { HangUpData } from "@/types/workflow";

type Props = NodeProps & { data: HangUpData };

export function HangUpNode({ data, selected }: Props) {
  return (
    <NodeShell
      nodeType="hangUp"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
      hideSource
    >
      {data.playMessage && data.message && (
        <div className="italic text-gray-500 line-clamp-2">
          &quot;{data.message}&quot;
        </div>
      )}
    </NodeShell>
  );
}

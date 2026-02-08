"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { VoicemailData } from "@/types/workflow";

type Props = NodeProps & { data: VoicemailData };

export function VoicemailNode({ data, selected }: Props) {
  return (
    <NodeShell
      nodeType="voicemail"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
      hideSource
    >
      {data.email && (
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Email</span>
          <span className="font-medium text-gray-800 truncate ml-2">
            {data.email}
          </span>
        </div>
      )}
    </NodeShell>
  );
}

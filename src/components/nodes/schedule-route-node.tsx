"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { ScheduleRouteData } from "@/types/workflow";

type Props = NodeProps & { data: ScheduleRouteData };

export function ScheduleRouteNode({ data, selected }: Props) {
  return (
    <NodeShell
      nodeType="scheduleRoute"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
      sourceHandles={[
        { id: "open", label: "Open Hours" },
        { id: "closed", label: "Closed Hours" },
      ]}
    >
      {data.timezone && (
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Timezone</span>
          <span className="font-medium text-gray-800 text-[11px]">
            {data.timezone}
          </span>
        </div>
      )}
      {data.rules && data.rules.length > 0 && (
        <div className="mt-1 text-gray-500">
          {data.rules.length} schedule rule{data.rules.length > 1 ? "s" : ""}
        </div>
      )}
    </NodeShell>
  );
}

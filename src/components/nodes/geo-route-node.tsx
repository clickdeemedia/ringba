"use client";

import React from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeShell } from "./node-shell";
import type { GeoRouteData } from "@/types/workflow";

type Props = NodeProps & { data: GeoRouteData };

export function GeoRouteNode({ data, selected }: Props) {
  return (
    <NodeShell
      nodeType="geoRoute"
      label={data.label}
      isConfigured={data.isConfigured}
      selected={selected}
    >
      {data.regions && data.regions.length > 0 ? (
        <div className="space-y-1">
          {data.regions.slice(0, 3).map((r, i) => (
            <div key={i} className="text-gray-700">
              {r.region}
              {r.states && (
                <span className="text-gray-400 ml-1">
                  ({r.states.length} states)
                </span>
              )}
            </div>
          ))}
          {data.regions.length > 3 && (
            <div className="text-gray-400">
              +{data.regions.length - 3} more
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-400 italic">No regions configured</div>
      )}
    </NodeShell>
  );
}

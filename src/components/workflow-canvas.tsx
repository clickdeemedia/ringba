"use client";

import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useWorkflowStore } from "@/stores/workflow-store";
import { useDnD } from "@/hooks/use-dnd";
import {
  IncomingCallNode,
  IVRNode,
  ConditionNode,
  PercentageRouteNode,
  GeoRouteNode,
  ScheduleRouteNode,
  BuyerNode,
  TransferCallNode,
  HangUpNode,
  VoicemailNode,
  TagCallerNode,
  WebhookNode,
} from "@/components/nodes";

const nodeTypes: NodeTypes = {
  incomingCall: IncomingCallNode,
  ivr: IVRNode,
  condition: ConditionNode,
  percentageRoute: PercentageRouteNode,
  geoRoute: GeoRouteNode,
  scheduleRoute: ScheduleRouteNode,
  buyer: BuyerNode,
  transferCall: TransferCallNode,
  hangUp: HangUpNode,
  voicemail: VoicemailNode,
  tagCaller: TagCallerNode,
  webhook: WebhookNode,
};

const defaultEdgeOptions = {
  type: "smoothstep",
  style: { stroke: "#94A3B8", strokeWidth: 2 },
};

export function WorkflowCanvas() {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const onNodesChange = useWorkflowStore((s) => s.onNodesChange);
  const onEdgesChange = useWorkflowStore((s) => s.onEdgesChange);
  const onConnect = useWorkflowStore((s) => s.onConnect);
  const selectNode = useWorkflowStore((s) => s.selectNode);

  const { onDragOver, onDrop } = useDnD();

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  const miniMapNodeColor = useMemo(
    () => () => "#6366F1",
    []
  );

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        className="bg-gray-50"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#CBD5E1"
        />
        <Controls
          className="!bg-white !border-gray-200 !shadow-lg !rounded-lg"
          showInteractive={false}
        />
        <MiniMap
          className="!bg-white !border-gray-200 !shadow-lg !rounded-lg"
          nodeColor={miniMapNodeColor}
          maskColor="rgba(0, 0, 0, 0.08)"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}

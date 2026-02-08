"use client";

import { useCallback, type DragEvent } from "react";
import { useReactFlow } from "@xyflow/react";
import type { WorkflowNodeType } from "@/types/workflow";
import { useWorkflowStore } from "@/stores/workflow-store";

export function useDnD() {
  const { screenToFlowPosition } = useReactFlow();
  const addNode = useWorkflowStore((s) => s.addNode);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData(
        "application/workflow-node-type"
      ) as WorkflowNodeType;
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [screenToFlowPosition, addNode]
  );

  return { onDragOver, onDrop };
}

export function startNodeDrag(
  event: DragEvent<HTMLDivElement>,
  nodeType: WorkflowNodeType
) {
  event.dataTransfer.setData("application/workflow-node-type", nodeType);
  event.dataTransfer.effectAllowed = "move";
}

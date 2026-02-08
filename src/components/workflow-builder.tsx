"use client";

import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { WorkflowToolbar } from "@/components/toolbar/workflow-toolbar";
import { Sidebar } from "@/components/panels/sidebar";
import { WorkflowCanvas } from "@/components/workflow-canvas";

export function WorkflowBuilder() {
  return (
    <ReactFlowProvider>
      <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
        <WorkflowToolbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <WorkflowCanvas />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

"use client";

import React from "react";
import { Blocks, Settings2, PanelLeftClose, PanelLeft } from "lucide-react";
import { useWorkflowStore } from "@/stores/workflow-store";
import { NodePalettePanel } from "./node-palette-panel";
import { NodePropertiesPanel } from "./node-properties-panel";

export function Sidebar() {
  const sidebarTab = useWorkflowStore((s) => s.sidebarTab);
  const setSidebarTab = useWorkflowStore((s) => s.setSidebarTab);
  const isSidebarOpen = useWorkflowStore((s) => s.isSidebarOpen);
  const toggleSidebar = useWorkflowStore((s) => s.toggleSidebar);

  if (!isSidebarOpen) {
    return (
      <button
        onClick={toggleSidebar}
        className="absolute left-4 top-20 z-10 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50"
        title="Open sidebar"
      >
        <PanelLeft size={18} className="text-gray-600" />
      </button>
    );
  }

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 h-full">
      {/* Tab header */}
      <div className="flex items-center border-b border-gray-200">
        <button
          onClick={() => setSidebarTab("palette")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            sidebarTab === "palette"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Blocks size={16} />
          Nodes
        </button>
        <button
          onClick={() => setSidebarTab("properties")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            sidebarTab === "properties"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Settings2 size={16} />
          Properties
        </button>
        <button
          onClick={toggleSidebar}
          className="p-2 mr-1 rounded hover:bg-gray-100 text-gray-400"
          title="Collapse sidebar"
        >
          <PanelLeftClose size={16} />
        </button>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-hidden">
        {sidebarTab === "palette" ? (
          <NodePalettePanel />
        ) : (
          <NodePropertiesPanel />
        )}
      </div>
    </div>
  );
}

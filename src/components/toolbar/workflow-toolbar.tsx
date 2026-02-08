"use client";

import React, { useState } from "react";
import {
  Play,
  Pause,
  Save,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Trash2,
  Download,
  Upload,
  ChevronLeft,
} from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { useWorkflowStore } from "@/stores/workflow-store";

export function WorkflowToolbar() {
  const workflowName = useWorkflowStore((s) => s.workflowName);
  const setWorkflowName = useWorkflowStore((s) => s.setWorkflowName);
  const isActive = useWorkflowStore((s) => s.isActive);
  const toggleActive = useWorkflowStore((s) => s.toggleActive);
  const clearWorkflow = useWorkflowStore((s) => s.clearWorkflow);
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const loadWorkflow = useWorkflowStore((s) => s.loadWorkflow);

  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);

  const handleExport = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${workflowName.replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string);
          if (parsed.nodes && parsed.edges) {
            loadWorkflow(parsed.nodes, parsed.edges);
          }
        } catch {
          // silently ignore invalid JSON
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
          <ChevronLeft size={20} />
        </button>

        <div className="h-6 w-px bg-gray-200" />

        {isEditing ? (
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            autoFocus
            className="text-lg font-semibold text-gray-900 bg-transparent border-b-2 border-blue-500 outline-none px-1"
          />
        ) : (
          <h1
            className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
            onClick={() => setIsEditing(true)}
            title="Click to rename"
          >
            {workflowName}
          </h1>
        )}

        <button
          onClick={toggleActive}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            isActive
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {isActive ? <Play size={12} /> : <Pause size={12} />}
          {isActive ? "Active" : "Paused"}
        </button>
      </div>

      {/* Center section: zoom controls */}
      <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-1 py-0.5">
        <ToolbarBtn icon={ZoomOut} onClick={() => zoomOut()} title="Zoom out" />
        <ToolbarBtn icon={ZoomIn} onClick={() => zoomIn()} title="Zoom in" />
        <ToolbarBtn
          icon={Maximize}
          onClick={() => fitView({ padding: 0.2 })}
          title="Fit to view"
        />
      </div>

      {/* Right section: actions */}
      <div className="flex items-center gap-1">
        <ToolbarBtn icon={Undo2} onClick={() => {}} title="Undo" disabled />
        <ToolbarBtn icon={Redo2} onClick={() => {}} title="Redo" disabled />

        <div className="h-6 w-px bg-gray-200 mx-1" />

        <ToolbarBtn icon={Upload} onClick={handleImport} title="Import" />
        <ToolbarBtn icon={Download} onClick={handleExport} title="Export" />

        <div className="h-6 w-px bg-gray-200 mx-1" />

        <ToolbarBtn
          icon={Trash2}
          onClick={clearWorkflow}
          title="Clear canvas"
          className="hover:!bg-red-50 hover:!text-red-600"
        />

        <button className="ml-2 flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Save size={14} />
          Save
        </button>
      </div>
    </div>
  );
}

function ToolbarBtn({
  icon: Icon,
  onClick,
  title,
  disabled,
  className = "",
}: {
  icon: React.ComponentType<{ size?: number }>;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      <Icon size={16} />
    </button>
  );
}

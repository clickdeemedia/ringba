"use client";

import React from "react";
import { Trash2, Copy, X } from "lucide-react";
import { useWorkflowStore } from "@/stores/workflow-store";
import { getNodePaletteItem } from "@/utils/node-palette";

export function NodePropertiesPanel() {
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);
  const nodes = useWorkflowStore((s) => s.nodes);
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const deleteNode = useWorkflowStore((s) => s.deleteNode);
  const duplicateNode = useWorkflowStore((s) => s.duplicateNode);
  const selectNode = useWorkflowStore((s) => s.selectNode);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center h-64">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <span className="text-gray-400 text-xl">?</span>
        </div>
        <p className="text-sm text-gray-500">
          Select a node on the canvas to view and edit its properties
        </p>
      </div>
    );
  }

  const paletteItem = getNodePaletteItem(selectedNode.data.nodeType);
  const data = selectedNode.data;

  return (
    <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-180px)]">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: paletteItem?.color || "#6B7280" }}
          />
          <span className="text-sm font-semibold text-gray-900">
            {paletteItem?.label || data.nodeType}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => duplicateNode(selectedNode.id)}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
            title="Duplicate"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={() => deleteNode(selectedNode.id)}
            className="p-1.5 rounded hover:bg-red-50 text-gray-500 hover:text-red-600"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={() => selectNode(null)}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Label */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Label
        </label>
        <input
          type="text"
          value={data.label}
          onChange={(e) =>
            updateNodeData(selectedNode.id, { label: e.target.value })
          }
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Description
        </label>
        <textarea
          value={data.description || ""}
          onChange={(e) =>
            updateNodeData(selectedNode.id, { description: e.target.value })
          }
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={2}
        />
      </div>

      {/* Type-specific fields */}
      {renderTypeFields(data.nodeType, data, selectedNode.id, updateNodeData)}

      {/* Configured toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">Configured</span>
        <button
          onClick={() =>
            updateNodeData(selectedNode.id, {
              isConfigured: !data.isConfigured,
            })
          }
          className={`relative w-10 h-5 rounded-full transition-colors ${
            data.isConfigured ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              data.isConfigured ? "left-5" : "left-0.5"
            }`}
          />
        </button>
      </div>

      {/* Node ID (debug) */}
      <div className="pt-2 border-t border-gray-100">
        <span className="text-[10px] text-gray-400 font-mono">
          ID: {selectedNode.id}
        </span>
      </div>
    </div>
  );
}

function renderTypeFields(
  nodeType: string,
  data: Record<string, unknown>,
  nodeId: string,
  update: (id: string, data: Record<string, unknown>) => void
) {
  switch (nodeType) {
    case "incomingCall":
      return (
        <>
          <FieldInput
            label="Tracking Number"
            value={(data.trackingNumber as string) || ""}
            onChange={(v) => update(nodeId, { trackingNumber: v })}
          />
          <FieldInput
            label="Source"
            value={(data.source as string) || ""}
            onChange={(v) => update(nodeId, { source: v })}
          />
        </>
      );

    case "buyer":
      return (
        <>
          <FieldInput
            label="Buyer Name"
            value={(data.buyerName as string) || ""}
            onChange={(v) => update(nodeId, { buyerName: v })}
          />
          <FieldInput
            label="Revenue ($)"
            value={String(data.revenue ?? "")}
            onChange={(v) => update(nodeId, { revenue: Number(v) || 0 })}
            type="number"
          />
          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Concurrency Cap"
              value={String(data.concurrencyCap ?? "")}
              onChange={(v) =>
                update(nodeId, { concurrencyCap: Number(v) || 0 })
              }
              type="number"
            />
            <FieldInput
              label="Daily Cap"
              value={String(data.dailyCap ?? "")}
              onChange={(v) => update(nodeId, { dailyCap: Number(v) || 0 })}
              type="number"
            />
          </div>
          <FieldInput
            label="Weight"
            value={String(data.weight ?? "")}
            onChange={(v) => update(nodeId, { weight: Number(v) || 1 })}
            type="number"
          />
        </>
      );

    case "transferCall":
      return (
        <>
          <FieldInput
            label="Destination Number"
            value={(data.destination as string) || ""}
            onChange={(v) => update(nodeId, { destination: v })}
          />
          <FieldInput
            label="Timeout (seconds)"
            value={String(data.timeout ?? "")}
            onChange={(v) => update(nodeId, { timeout: Number(v) || 30 })}
            type="number"
          />
        </>
      );

    case "ivr":
      return (
        <>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Voice Prompt
            </label>
            <textarea
              value={(data.prompt as string) || ""}
              onChange={(e) => update(nodeId, { prompt: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Timeout (sec)"
              value={String(data.timeout ?? "")}
              onChange={(v) => update(nodeId, { timeout: Number(v) || 10 })}
              type="number"
            />
            <FieldInput
              label="Max Retries"
              value={String(data.maxRetries ?? "")}
              onChange={(v) => update(nodeId, { maxRetries: Number(v) || 3 })}
              type="number"
            />
          </div>
        </>
      );

    case "webhook":
      return (
        <>
          <FieldInput
            label="URL"
            value={(data.url as string) || ""}
            onChange={(v) => update(nodeId, { url: v })}
          />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Method
            </label>
            <select
              value={(data.method as string) || "POST"}
              onChange={(e) => update(nodeId, { method: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
            </select>
          </div>
        </>
      );

    case "condition":
      return (
        <>
          <FieldInput
            label="Field"
            value={(data.field as string) || ""}
            onChange={(v) => update(nodeId, { field: v })}
          />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Operator
            </label>
            <select
              value={(data.operator as string) || "equals"}
              onChange={(e) => update(nodeId, { operator: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
              <option value="startsWith">Starts With</option>
              <option value="greaterThan">Greater Than</option>
              <option value="lessThan">Less Than</option>
            </select>
          </div>
          <FieldInput
            label="Value"
            value={(data.value as string) || ""}
            onChange={(v) => update(nodeId, { value: v })}
          />
        </>
      );

    case "hangUp":
      return (
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Goodbye Message
          </label>
          <textarea
            value={(data.message as string) || ""}
            onChange={(e) => update(nodeId, { message: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
          />
        </div>
      );

    case "voicemail":
      return (
        <>
          <FieldInput
            label="Email Notification"
            value={(data.email as string) || ""}
            onChange={(v) => update(nodeId, { email: v })}
          />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Greeting
            </label>
            <textarea
              value={(data.greeting as string) || ""}
              onChange={(e) => update(nodeId, { greeting: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
            />
          </div>
        </>
      );

    case "scheduleRoute":
      return (
        <FieldInput
          label="Timezone"
          value={(data.timezone as string) || ""}
          onChange={(v) => update(nodeId, { timezone: v })}
        />
      );

    default:
      return null;
  }
}

function FieldInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

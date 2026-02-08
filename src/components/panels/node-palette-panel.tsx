"use client";

import React from "react";
import {
  PhoneIncoming,
  ListTree,
  GitBranch,
  PieChart,
  Globe,
  Clock,
  User,
  PhoneForwarded,
  PhoneOff,
  Mic,
  Tag,
  Webhook,
} from "lucide-react";
import type { WorkflowNodeType } from "@/types/workflow";
import {
  categoryOrder,
  categoryLabels,
  getNodesByCategory,
} from "@/utils/node-palette";
import { startNodeDrag } from "@/hooks/use-dnd";

const iconComponents: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  PhoneIncoming,
  ListTree,
  GitBranch,
  PieChart,
  Globe,
  Clock,
  User,
  PhoneForwarded,
  PhoneOff,
  Mic,
  Tag,
  Webhook,
};

export function NodePalettePanel() {
  return (
    <div className="p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-180px)]">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Drag nodes to canvas
      </div>

      {categoryOrder.map((category) => {
        const items = getNodesByCategory(category);
        if (items.length === 0) return null;

        return (
          <div key={category}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {categoryLabels[category]}
            </div>
            <div className="space-y-1.5">
              {items.map((item) => {
                const Icon = iconComponents[item.icon];
                return (
                  <div
                    key={item.type}
                    draggable
                    onDragStart={(e) =>
                      startNodeDrag(e, item.type as WorkflowNodeType)
                    }
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-200 bg-white cursor-grab hover:border-gray-300 hover:shadow-sm active:cursor-grabbing transition-all"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: item.color }}
                    >
                      {Icon && <Icon size={14} className="text-white" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        {item.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

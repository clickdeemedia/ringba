import type { NodePaletteItem, NodeCategory } from "@/types/workflow";

export const nodePalette: NodePaletteItem[] = [
  // Triggers
  {
    type: "incomingCall",
    label: "Incoming Call",
    description: "Entry point for incoming calls",
    category: "triggers",
    icon: "PhoneIncoming",
    color: "#22C55E",
  },

  // Routing
  {
    type: "ivr",
    label: "IVR Menu",
    description: "Interactive voice response with key press options",
    category: "routing",
    icon: "ListTree",
    color: "#3B82F6",
  },
  {
    type: "percentageRoute",
    label: "Percentage Split",
    description: "Route calls by percentage distribution",
    category: "routing",
    icon: "PieChart",
    color: "#8B5CF6",
  },
  {
    type: "geoRoute",
    label: "Geo Route",
    description: "Route calls based on caller geography",
    category: "routing",
    icon: "Globe",
    color: "#06B6D4",
  },
  {
    type: "scheduleRoute",
    label: "Schedule Route",
    description: "Route calls based on time and schedule",
    category: "routing",
    icon: "Clock",
    color: "#F59E0B",
  },

  // Conditions
  {
    type: "condition",
    label: "Condition",
    description: "Branch based on call attributes",
    category: "conditions",
    icon: "GitBranch",
    color: "#EF4444",
  },

  // Actions
  {
    type: "tagCaller",
    label: "Tag Caller",
    description: "Apply tags to the caller for tracking",
    category: "actions",
    icon: "Tag",
    color: "#EC4899",
  },
  {
    type: "webhook",
    label: "Webhook",
    description: "Send data to an external URL",
    category: "actions",
    icon: "Webhook",
    color: "#64748B",
  },
  {
    type: "voicemail",
    label: "Voicemail",
    description: "Send caller to voicemail",
    category: "actions",
    icon: "Mic",
    color: "#14B8A6",
  },

  // Destinations
  {
    type: "buyer",
    label: "Buyer",
    description: "Route call to a buyer destination",
    category: "destinations",
    icon: "User",
    color: "#F97316",
  },
  {
    type: "transferCall",
    label: "Transfer Call",
    description: "Transfer the call to a phone number",
    category: "destinations",
    icon: "PhoneForwarded",
    color: "#10B981",
  },
  {
    type: "hangUp",
    label: "Hang Up",
    description: "End the call",
    category: "destinations",
    icon: "PhoneOff",
    color: "#DC2626",
  },
];

export const categoryLabels: Record<NodeCategory, string> = {
  triggers: "Triggers",
  routing: "Routing",
  conditions: "Conditions",
  actions: "Actions",
  destinations: "Destinations",
};

export const categoryOrder: NodeCategory[] = [
  "triggers",
  "routing",
  "conditions",
  "actions",
  "destinations",
];

export function getNodesByCategory(
  category: NodeCategory
): NodePaletteItem[] {
  return nodePalette.filter((n) => n.category === category);
}

export function getNodePaletteItem(
  type: string
): NodePaletteItem | undefined {
  return nodePalette.find((n) => n.type === type);
}

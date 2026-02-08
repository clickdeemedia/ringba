import type { WorkflowNodeData, WorkflowNodeType } from "@/types/workflow";

export function createDefaultNodeData(
  type: WorkflowNodeType
): WorkflowNodeData {
  const base = { isConfigured: false };

  switch (type) {
    case "incomingCall":
      return {
        ...base,
        nodeType: "incomingCall",
        label: "Incoming Call",
        description: "Entry point",
      };
    case "ivr":
      return {
        ...base,
        nodeType: "ivr",
        label: "IVR Menu",
        prompt: "Press 1 for Sales, Press 2 for Support",
        keys: [
          { key: "1", label: "Sales" },
          { key: "2", label: "Support" },
        ],
        timeout: 10,
        maxRetries: 3,
      };
    case "condition":
      return {
        ...base,
        nodeType: "condition",
        label: "Condition",
        field: "caller_state",
        operator: "equals",
        value: "",
      };
    case "percentageRoute":
      return {
        ...base,
        nodeType: "percentageRoute",
        label: "Percentage Split",
        splits: [
          { label: "Path A", percentage: 50 },
          { label: "Path B", percentage: 50 },
        ],
      };
    case "geoRoute":
      return {
        ...base,
        nodeType: "geoRoute",
        label: "Geo Route",
        regions: [],
      };
    case "scheduleRoute":
      return {
        ...base,
        nodeType: "scheduleRoute",
        label: "Schedule Route",
        timezone: "America/New_York",
        rules: [],
      };
    case "buyer":
      return {
        ...base,
        nodeType: "buyer",
        label: "Buyer",
        buyerName: "",
        concurrencyCap: 5,
        dailyCap: 100,
        revenue: 0,
        weight: 1,
      };
    case "transferCall":
      return {
        ...base,
        nodeType: "transferCall",
        label: "Transfer Call",
        destination: "",
        timeout: 30,
      };
    case "hangUp":
      return {
        ...base,
        nodeType: "hangUp",
        label: "Hang Up",
        playMessage: false,
        message: "",
      };
    case "voicemail":
      return {
        ...base,
        nodeType: "voicemail",
        label: "Voicemail",
        greeting: "",
        email: "",
      };
    case "tagCaller":
      return {
        ...base,
        nodeType: "tagCaller",
        label: "Tag Caller",
        tags: [],
      };
    case "webhook":
      return {
        ...base,
        nodeType: "webhook",
        label: "Webhook",
        url: "",
        method: "POST",
        headers: {},
      };
  }
}

import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type Connection,
  type NodeChange,
  type EdgeChange,
} from "@xyflow/react";
import type {
  WorkflowNode,
  WorkflowEdge,
  WorkflowNodeType,
  WorkflowNodeData,
} from "@/types/workflow";
import { createDefaultNodeData } from "@/utils/default-node-data";

interface WorkflowState {
  // Workflow metadata
  workflowName: string;
  workflowDescription: string;
  isActive: boolean;

  // React Flow state
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];

  // UI state
  selectedNodeId: string | null;
  sidebarTab: "palette" | "properties";
  isSidebarOpen: boolean;

  // Node/Edge operations
  onNodesChange: OnNodesChange<WorkflowNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

  // Node CRUD
  addNode: (type: WorkflowNodeType, position: { x: number; y: number }) => void;
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
  deleteNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;

  // Selection
  selectNode: (nodeId: string | null) => void;

  // UI actions
  setSidebarTab: (tab: "palette" | "properties") => void;
  toggleSidebar: () => void;

  // Workflow actions
  setWorkflowName: (name: string) => void;
  setWorkflowDescription: (description: string) => void;
  toggleActive: () => void;
  clearWorkflow: () => void;
  loadWorkflow: (nodes: WorkflowNode[], edges: WorkflowEdge[]) => void;
}

let nodeIdCounter = 0;

function generateNodeId(): string {
  nodeIdCounter++;
  return `node_${Date.now()}_${nodeIdCounter}`;
}

// Default starter workflow
const defaultNodes: WorkflowNode[] = [
  {
    id: "node_start",
    type: "incomingCall",
    position: { x: 100, y: 300 },
    data: {
      nodeType: "incomingCall",
      label: "Incoming Call",
      description: "Main tracking number",
      trackingNumber: "+1 (888) 555-0100",
      source: "Google Ads",
      isConfigured: true,
    },
  },
  {
    id: "node_ivr_1",
    type: "ivr",
    position: { x: 450, y: 280 },
    data: {
      nodeType: "ivr",
      label: "Main Menu",
      prompt: "Press 1 for Sales, Press 2 for Support",
      keys: [
        { key: "1", label: "Sales" },
        { key: "2", label: "Support" },
      ],
      timeout: 10,
      maxRetries: 3,
      isConfigured: true,
    },
  },
  {
    id: "node_pct_1",
    type: "percentageRoute",
    position: { x: 800, y: 150 },
    data: {
      nodeType: "percentageRoute",
      label: "Sales Split",
      splits: [
        { label: "Buyer A", percentage: 60 },
        { label: "Buyer B", percentage: 40 },
      ],
      isConfigured: true,
    },
  },
  {
    id: "node_buyer_1",
    type: "buyer",
    position: { x: 1200, y: 80 },
    data: {
      nodeType: "buyer",
      label: "Acme Insurance",
      buyerName: "Acme Insurance Co.",
      concurrencyCap: 10,
      dailyCap: 200,
      revenue: 45,
      weight: 1,
      isConfigured: true,
    },
  },
  {
    id: "node_buyer_2",
    type: "buyer",
    position: { x: 1200, y: 280 },
    data: {
      nodeType: "buyer",
      label: "Best Coverage",
      buyerName: "Best Coverage LLC",
      concurrencyCap: 5,
      dailyCap: 100,
      revenue: 38,
      weight: 1,
      isConfigured: true,
    },
  },
  {
    id: "node_hangup",
    type: "hangUp",
    position: { x: 1200, y: 460 },
    data: {
      nodeType: "hangUp",
      label: "End Call",
      playMessage: true,
      message: "Thank you for calling. Goodbye.",
      isConfigured: true,
    },
  },
];

const defaultEdges: WorkflowEdge[] = [
  {
    id: "e_start_ivr",
    source: "node_start",
    target: "node_ivr_1",
    animated: true,
  },
  {
    id: "e_ivr_pct",
    source: "node_ivr_1",
    target: "node_pct_1",
    sourceHandle: "key-1",
    label: "Press 1",
  },
  {
    id: "e_ivr_hangup",
    source: "node_ivr_1",
    target: "node_hangup",
    sourceHandle: "key-2",
    label: "Press 2",
  },
  {
    id: "e_pct_buyer1",
    source: "node_pct_1",
    target: "node_buyer_1",
    sourceHandle: "split-0",
    label: "60%",
  },
  {
    id: "e_pct_buyer2",
    source: "node_pct_1",
    target: "node_buyer_2",
    sourceHandle: "split-1",
    label: "40%",
  },
];

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  // Metadata
  workflowName: "Auto Insurance Campaign",
  workflowDescription: "Main call routing workflow for auto insurance leads",
  isActive: true,

  // Flow state
  nodes: defaultNodes,
  edges: defaultEdges,

  // UI state
  selectedNodeId: null,
  sidebarTab: "palette",
  isSidebarOpen: true,

  // React Flow callbacks
  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });

    // Track selection from React Flow
    const selectChange = changes.find(
      (c) => c.type === "select" && c.selected
    );
    if (selectChange && "id" in selectChange) {
      set({ selectedNodeId: selectChange.id, sidebarTab: "properties" });
    }
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection: Connection) => {
    const newEdge: WorkflowEdge = {
      ...connection,
      id: `e_${connection.source}_${connection.target}_${Date.now()}`,
      animated: false,
    };
    set({ edges: addEdge(newEdge, get().edges) });
  },

  // Node CRUD
  addNode: (type, position) => {
    const data = createDefaultNodeData(type);
    const newNode: WorkflowNode = {
      id: generateNodeId(),
      type,
      position,
      data,
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  updateNodeData: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } as WorkflowNodeData }
          : node
      ),
    });
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== nodeId),
      edges: get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      ),
      selectedNodeId:
        get().selectedNodeId === nodeId ? null : get().selectedNodeId,
    });
  },

  duplicateNode: (nodeId) => {
    const node = get().nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const newNode: WorkflowNode = {
      ...node,
      id: generateNodeId(),
      position: { x: node.position.x + 50, y: node.position.y + 50 },
      data: { ...node.data, label: `${node.data.label} (copy)` },
      selected: false,
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  // Selection
  selectNode: (nodeId) => {
    set({
      selectedNodeId: nodeId,
      sidebarTab: nodeId ? "properties" : "palette",
    });
  },

  // UI
  setSidebarTab: (tab) => set({ sidebarTab: tab }),
  toggleSidebar: () => set({ isSidebarOpen: !get().isSidebarOpen }),

  // Workflow metadata
  setWorkflowName: (name) => set({ workflowName: name }),
  setWorkflowDescription: (description) =>
    set({ workflowDescription: description }),
  toggleActive: () => set({ isActive: !get().isActive }),
  clearWorkflow: () =>
    set({ nodes: [], edges: [], selectedNodeId: null }),
  loadWorkflow: (nodes, edges) =>
    set({ nodes, edges, selectedNodeId: null }),
}));

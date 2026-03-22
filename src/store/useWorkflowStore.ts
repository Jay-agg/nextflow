"use client";

import { create } from "zustand";
import {
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";

interface HistorySnapshot {
  nodes: Node[];
  edges: Edge[];
}

export interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  past: HistorySnapshot[];
  future: HistorySnapshot[];

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;
}

const MAX_HISTORY = 50;

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  past: [],
  future: [],

  pushHistory: () => {
    const { nodes, edges, past } = get();
    const snapshot: HistorySnapshot = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    };
    set({
      past: [...past.slice(-MAX_HISTORY + 1), snapshot],
      future: [],
    });
  },

  onNodesChange: (changes) => {
    const hasMeaningfulChange = changes.some(
      (c) =>
        c.type === "remove" ||
        c.type === "position" ||
        c.type === "dimensions"
    );

    if (hasMeaningfulChange) {
      const isDragEnd = changes.some(
        (c) => c.type === "position" && c.dragging === false
      );
      if (isDragEnd) {
        get().pushHistory();
      }
    }

    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    const hasRemoval = changes.some((c) => c.type === "remove");
    if (hasRemoval) {
      get().pushHistory();
    }
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    get().pushHistory();

    const styledEdge = {
      ...connection,
      animated: true,
      style: { stroke: "#A855F7", strokeWidth: 2 },
    };

    set({ edges: addEdge(styledEdge, get().edges) });
  },

  addNode: (node) => {
    get().pushHistory();
    set((state) => ({ nodes: [...state.nodes, node] }));
  },

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  undo: () => {
    const { past, nodes, edges } = get();
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const currentSnapshot: HistorySnapshot = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    };

    set({
      nodes: previous.nodes,
      edges: previous.edges,
      past: past.slice(0, -1),
      future: [currentSnapshot, ...get().future],
    });
  },

  redo: () => {
    const { future, nodes, edges } = get();
    if (future.length === 0) return;

    const next = future[0];
    const currentSnapshot: HistorySnapshot = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    };

    set({
      nodes: next.nodes,
      edges: next.edges,
      past: [...get().past, currentSnapshot],
      future: future.slice(1),
    });
  },
}));

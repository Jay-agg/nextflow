"use client";

import { useMemo } from "react";
import { useWorkflowStore } from "@/store/useWorkflowStore";

export function useConnectedHandles(nodeId: string): Set<string> {
  const edges = useWorkflowStore((s) => s.edges);

  return useMemo(() => {
    const connected = new Set<string>();
    for (const edge of edges) {
      if (edge.target === nodeId && edge.targetHandle) {
        connected.add(edge.targetHandle);
      }
    }
    return connected;
  }, [edges, nodeId]);
}

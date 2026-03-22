"use client";

import { useCallback, useEffect, type DragEvent } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MiniMap,
  useReactFlow,
  type Connection,
  type IsValidConnection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useWorkflowStore } from "@/store/useWorkflowStore";
import {
  isTypeSafeConnection,
  wouldCreateCycle,
} from "@/lib/connectionRules";
import { nodeTypes } from "./nodes";
import CanvasControls from "./CanvasControls";

export default function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    undo,
    redo,
  } = useWorkflowStore();
  const { screenToFlowPosition, getNode } = useReactFlow();

  const isValidConnection: IsValidConnection = useCallback(
    (connection: Connection | { source: string; target: string; sourceHandle?: string | null; targetHandle?: string | null }) => {
      if (connection.source === connection.target) return false;

      const sourceNode = getNode(connection.source);
      if (!sourceNode) return false;

      if (
        !isTypeSafeConnection(
          sourceNode.type,
          connection.targetHandle ?? undefined
        )
      ) {
        return false;
      }

      if (wouldCreateCycle(edges, connection as Connection)) {
        return false;
      }

      return true;
    },
    [edges, getNode]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      if (e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        (e.key === "z" && e.shiftKey) ||
        e.key === "y"
      ) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();

      const type = e.dataTransfer.getData("application/nextflow-node-type");
      if (!type) return;

      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      addNode({
        id: crypto.randomUUID(),
        type,
        position,
        data: {},
      });
    },
    [screenToFlowPosition, addNode]
  );

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        isValidConnection={isValidConnection}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-zinc-950"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(255,255,255,0.04)"
        />
        <CanvasControls />
        <MiniMap
          className="react-flow__minimap--dark"
          position="bottom-right"
          maskColor="rgba(9, 9, 11, 0.7)"
          bgColor="#18181b"
          nodeColor="#3f3f46"
        />
      </ReactFlow>
    </div>
  );
}

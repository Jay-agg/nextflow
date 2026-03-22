import type { Edge, Connection } from "@xyflow/react";

type DataType = "text" | "image" | "video";

const OUTPUT_TYPES: Record<string, DataType> = {
  text: "text",
  uploadImage: "image",
  uploadVideo: "video",
  cropImage: "image",
  extractFrame: "image",
  llm: "text",
};

const INPUT_ACCEPTED_TYPES: Record<string, DataType> = {
  // LLM Node
  system_prompt: "text",
  user_message: "text",
  images: "image",
  // Crop Image Node
  image_url: "image",
  x_percent: "text",
  y_percent: "text",
  width_percent: "text",
  height_percent: "text",
  // Extract Frame Node
  video_url: "video",
  timestamp: "text",
};

export function isTypeSafeConnection(
  sourceNodeType: string | undefined,
  targetHandleId: string | undefined
): boolean {
  if (!sourceNodeType || !targetHandleId) return false;

  const outputType = OUTPUT_TYPES[sourceNodeType];
  const acceptedType = INPUT_ACCEPTED_TYPES[targetHandleId];

  if (!outputType || !acceptedType) return false;

  return outputType === acceptedType;
}

export function wouldCreateCycle(
  edges: Edge[],
  connection: Connection
): boolean {
  if (!connection.source || !connection.target) return false;
  if (connection.source === connection.target) return true;

  const adjacency = new Map<string, Set<string>>();
  for (const edge of edges) {
    if (!adjacency.has(edge.source)) {
      adjacency.set(edge.source, new Set());
    }
    adjacency.get(edge.source)!.add(edge.target);
  }

  if (!adjacency.has(connection.source)) {
    adjacency.set(connection.source, new Set());
  }
  adjacency.get(connection.source)!.add(connection.target);

  const visited = new Set<string>();
  const stack = [connection.target];

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current === connection.source) return true;
    if (visited.has(current)) continue;
    visited.add(current);

    const neighbors = adjacency.get(current);
    if (neighbors) {
      for (const neighbor of neighbors) {
        stack.push(neighbor);
      }
    }
  }

  return false;
}

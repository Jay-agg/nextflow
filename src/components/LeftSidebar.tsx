"use client";

import { useState, type DragEvent } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Type,
  ImagePlus,
  VideoIcon,
  BrainCircuit,
  Crop,
  Film,
  Search,
} from "lucide-react";

const NODE_TYPES = [
  {
    id: "text",
    label: "Text",
    icon: Type,
    description: "Plain text input",
  },
  {
    id: "uploadImage",
    label: "Upload Image",
    icon: ImagePlus,
    description: "JPG, PNG, WebP, GIF",
  },
  {
    id: "uploadVideo",
    label: "Upload Video",
    icon: VideoIcon,
    description: "MP4, MOV, WebM",
  },
  {
    id: "llm",
    label: "Run Any LLM",
    icon: BrainCircuit,
    description: "Gemini AI prompt",
  },
  {
    id: "cropImage",
    label: "Crop Image",
    icon: Crop,
    description: "Crop with coordinates",
  },
  {
    id: "extractFrame",
    label: "Extract Frame",
    icon: Film,
    description: "Frame from video",
  },
] as const;

function onDragStart(e: DragEvent, nodeType: string) {
  e.dataTransfer.setData("application/nextflow-node-type", nodeType);
  e.dataTransfer.effectAllowed = "move";
}

export default function LeftSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = NODE_TYPES.filter(
    (n) =>
      n.label.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
  );

  if (collapsed) {
    return (
      <aside className="flex h-full w-12 flex-col items-center border-r border-white/5 bg-zinc-900 py-3">
        <button
          onClick={() => setCollapsed(false)}
          className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300"
        >
          <PanelLeftOpen size={18} />
        </button>
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/5 bg-zinc-900">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-white/5 px-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Quick Access
        </h2>
        <button
          onClick={() => setCollapsed(true)}
          className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300"
        >
          <PanelLeftClose size={15} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2.5">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600"
          />
          <input
            type="text"
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/5 bg-zinc-800/40 py-1.5 pl-8 pr-3 text-sm text-zinc-300 placeholder-zinc-600 outline-none transition-colors focus:border-white/10 focus:bg-zinc-800/60"
          />
        </div>
      </div>

      {/* Node buttons — draggable */}
      <div className="flex-1 space-y-0.5 overflow-y-auto px-2 py-1">
        {filtered.map((node) => (
          <button
            key={node.id}
            draggable
            onDragStart={(e) => onDragStart(e, node.id)}
            className="flex w-full cursor-grab items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-zinc-800/50 active:cursor-grabbing"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-800/60 text-zinc-500">
              <node.icon size={16} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-zinc-300">{node.label}</p>
              <p className="truncate text-xs text-zinc-600">
                {node.description}
              </p>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <p className="py-6 text-center text-xs text-zinc-600">
            No matching nodes
          </p>
        )}
      </div>
    </aside>
  );
}

"use client";

import { useReactFlow, Panel } from "@xyflow/react";
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  Lock,
  Unlock,
} from "lucide-react";
import { useState } from "react";

export default function CanvasControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [locked, setLocked] = useState(false);

  const buttons = [
    { icon: ZoomIn, action: () => zoomIn({ duration: 200 }), label: "Zoom in" },
    { icon: ZoomOut, action: () => zoomOut({ duration: 200 }), label: "Zoom out" },
    { icon: Maximize, action: () => fitView({ duration: 300 }), label: "Fit view" },
    {
      icon: locked ? Lock : Unlock,
      action: () => setLocked((v) => !v),
      label: locked ? "Unlock" : "Lock",
      active: locked,
    },
  ] as const;

  return (
    <Panel position="bottom-center" className="!mb-4">
      <div className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-zinc-900 p-1 shadow-lg shadow-black/30">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            title={btn.label}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              "active" in btn && btn.active
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <btn.icon size={15} strokeWidth={1.8} />
          </button>
        ))}
      </div>
    </Panel>
  );
}

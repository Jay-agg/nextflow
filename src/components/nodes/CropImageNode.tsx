"use client";

import { memo, useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Crop } from "lucide-react";
import { useConnectedHandles } from "@/hooks/useConnectedHandles";

function CropImageNode({ id }: NodeProps) {
  const [values, setValues] = useState({ x: 0, y: 0, w: 100, h: 100 });
  const connected = useConnectedHandles(id);

  const update = (key: keyof typeof values, val: string) => {
    setValues((prev) => ({ ...prev, [key]: Number(val) || 0 }));
  };

  const fields = [
    { key: "x" as const, label: "X %", handleId: "x_percent" },
    { key: "y" as const, label: "Y %", handleId: "y_percent" },
    { key: "w" as const, label: "W %", handleId: "width_percent" },
    { key: "h" as const, label: "H %", handleId: "height_percent" },
  ];

  const imageConnected = connected.has("image_url");

  return (
    <div className="min-w-[240px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 font-sans text-zinc-300 shadow-xl">
      <Handle
        type="target"
        position={Position.Left}
        id="image_url"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
        style={{ top: "14%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="x_percent"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
        style={{ top: "38%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="y_percent"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
        style={{ top: "52%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="width_percent"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
        style={{ top: "66%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="height_percent"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
        style={{ top: "80%" }}
      />

      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-3 py-2">
        <Crop size={13} className="text-zinc-500" />
        <span className="text-xs font-semibold">Crop Image</span>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${
            imageConnected
              ? "border-accent-500/20 bg-accent-500/5"
              : "border-white/5 bg-zinc-800/30"
          }`}
        >
          <span className="text-[11px] text-zinc-500">image_url</span>
          <span
            className={`ml-auto text-[10px] ${
              imageConnected ? "text-accent-400" : "text-zinc-600"
            }`}
          >
            {imageConnected ? "connected" : "awaiting"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {fields.map((f) => {
            const isLinked = connected.has(f.handleId);
            return (
              <div key={f.key} className="flex flex-col gap-1">
                <label className="text-[10px] text-zinc-500">{f.label}</label>
                {isLinked ? (
                  <div className="flex items-center rounded-md border border-accent-500/20 bg-accent-500/5 px-2 py-1 text-[10px] text-accent-400">
                    linked
                  </div>
                ) : (
                  <input
                    type="number"
                    value={values[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                    min={0}
                    max={100}
                    className="w-full rounded-md border border-white/5 bg-zinc-800/50 px-2 py-1 text-xs text-zinc-300 outline-none transition-colors focus:border-white/10 focus:bg-zinc-800 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
      />
    </div>
  );
}

export default memo(CropImageNode);

"use client";

import { memo, useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Film } from "lucide-react";
import { useConnectedHandles } from "@/hooks/useConnectedHandles";

function ExtractFrameNode({ id }: NodeProps) {
  const [timestamp, setTimestamp] = useState("00:00:01");
  const connected = useConnectedHandles(id);

  const videoConnected = connected.has("video_url");
  const timestampConnected = connected.has("timestamp");

  return (
    <div className="min-w-[240px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 font-sans text-zinc-300 shadow-xl">
      <Handle
        type="target"
        position={Position.Left}
        id="video_url"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
        style={{ top: "30%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="timestamp"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
        style={{ top: "70%" }}
      />

      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-3 py-2">
        <Film size={13} className="text-zinc-500" />
        <span className="text-xs font-semibold">Extract Frame</span>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${
            videoConnected
              ? "border-accent-500/20 bg-accent-500/5"
              : "border-white/5 bg-zinc-800/30"
          }`}
        >
          <span className="text-[11px] text-zinc-500">video_url</span>
          <span
            className={`ml-auto text-[10px] ${
              videoConnected ? "text-accent-400" : "text-zinc-600"
            }`}
          >
            {videoConnected ? "connected" : "awaiting"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-zinc-500">Timestamp</label>
          {timestampConnected ? (
            <div className="flex items-center rounded-md border border-accent-500/20 bg-accent-500/5 px-3 py-1.5 text-[10px] text-accent-400">
              linked
            </div>
          ) : (
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="00:00:01 or 50%"
              className="w-full rounded-md border border-white/5 bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 outline-none transition-colors focus:border-white/10 focus:bg-zinc-800"
            />
          )}
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

export default memo(ExtractFrameNode);

"use client";

import { memo, useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Type } from "lucide-react";

function TextNode(_props: NodeProps) {
  const [text, setText] = useState("");

  return (
    <div className="min-w-[240px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 font-sans text-zinc-300 shadow-xl">
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-3 py-2">
        <Type size={13} className="text-zinc-500" />
        <span className="text-xs font-semibold">Text</span>
      </div>

      <div className="p-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          rows={3}
          className="w-full resize-none rounded-lg border border-white/5 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-300 placeholder-zinc-600 outline-none transition-colors focus:border-white/10 focus:bg-zinc-800"
        />
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

export default memo(TextNode);

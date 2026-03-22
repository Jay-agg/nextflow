"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { ImagePlus, Upload } from "lucide-react";

function UploadImageNode(_props: NodeProps) {
  return (
    <div className="min-w-[240px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 font-sans text-zinc-300 shadow-xl">
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-3 py-2">
        <ImagePlus size={13} className="text-zinc-500" />
        <span className="text-xs font-semibold">Upload Image</span>
      </div>

      <div className="p-3">
        <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-700 bg-zinc-800/30 px-4 py-6 transition-colors hover:border-zinc-600 hover:bg-zinc-800/50">
          <Upload size={18} className="text-zinc-500" />
          <p className="text-xs text-zinc-500">
            Click to upload JPG / PNG / WebP / GIF
          </p>
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

export default memo(UploadImageNode);

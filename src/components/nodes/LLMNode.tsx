"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { BrainCircuit, ChevronDown } from "lucide-react";
import { useConnectedHandles } from "@/hooks/useConnectedHandles";

interface InputRow {
  handleId: string;
  label: string;
  badge: string;
}

const INPUTS: InputRow[] = [
  { handleId: "system_prompt", label: "system_prompt", badge: "optional" },
  { handleId: "user_message", label: "user_message", badge: "required" },
  { handleId: "images", label: "images", badge: "optional" },
];

function LLMNode({ id }: NodeProps) {
  const connected = useConnectedHandles(id);

  return (
    <div className="min-w-[280px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 font-sans text-zinc-300 shadow-xl">
      <Handle
        type="target"
        position={Position.Left}
        id="system_prompt"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
        style={{ top: "18%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="user_message"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
        style={{ top: "36%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="images"
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
        style={{ top: "54%" }}
      />

      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-3 py-2">
        <BrainCircuit size={13} className="text-zinc-500" />
        <span className="text-xs font-semibold">Run Any LLM</span>
      </div>

      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-col gap-1.5">
          {INPUTS.map((input) => {
            const isLinked = connected.has(input.handleId);
            return (
              <div
                key={input.handleId}
                className={`flex items-center gap-2 rounded-md border px-3 py-1.5 ${
                  isLinked
                    ? "border-accent-500/20 bg-accent-500/5"
                    : "border-white/5 bg-zinc-800/30"
                }`}
              >
                <span className="text-[11px] text-zinc-500">
                  {input.label}
                </span>
                <span
                  className={`ml-auto text-[10px] ${
                    isLinked ? "text-accent-400" : "text-zinc-600"
                  }`}
                >
                  {isLinked ? "connected" : input.badge}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-zinc-500">Model</label>
          <div className="relative">
            <select className="w-full appearance-none rounded-md border border-white/5 bg-zinc-800/50 px-3 py-1.5 pr-8 text-xs text-zinc-300 outline-none transition-colors focus:border-white/10 focus:bg-zinc-800">
              <option>Gemini 1.5 Pro</option>
            </select>
            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500"
            />
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-950/50 px-3 py-4 text-center">
          <p className="text-xs italic text-zinc-500">
            Results will appear here inline
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

export default memo(LLMNode);

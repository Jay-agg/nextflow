"use client";

import { History, Clock } from "lucide-react";

export default function RightSidebar() {
  return (
    <aside className="flex h-full w-80 flex-col border-l border-white/5 bg-zinc-900">
      {/* Header */}
      <div className="flex h-14 items-center gap-2 border-b border-white/5 px-4">
        <History size={14} className="text-zinc-500" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Workflow History
        </h2>
      </div>

      {/* Empty state */}
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800/40">
          <Clock size={20} className="text-zinc-600" />
        </div>
        <div className="text-center">
          <p className="text-sm text-zinc-500">No runs yet</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-600">
            Run a workflow to see execution history, status, and node-level
            results here.
          </p>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { useState } from "react";
import { Play, Share2 } from "lucide-react";

export default function TopHeader() {
  const [name, setName] = useState("Untitled");

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/5 bg-zinc-950 px-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        spellCheck={false}
        className="w-56 bg-transparent text-sm font-medium text-zinc-200 outline-none placeholder-zinc-500 selection:bg-primary-600/30 hover:text-white focus:text-white"
        placeholder="Workflow name..."
      />

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-200">
          <Share2 size={13} />
          Share
        </button>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-500">
          <Play size={13} fill="currentColor" />
          Run Workflow
        </button>
      </div>
    </header>
  );
}

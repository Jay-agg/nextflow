"use client";

import { Handle, Position } from "@xyflow/react";

interface HandleLabelProps {
  type: "source" | "target";
  position: Position;
  id: string;
  label: string;
  style?: React.CSSProperties;
}

export default function HandleLabel({
  type,
  position,
  id,
  label,
  style,
}: HandleLabelProps) {
  const isLeft = position === Position.Left;

  return (
    <div className="relative" style={style}>
      <Handle
        type={type}
        position={position}
        id={id}
        className="!h-3 !w-3 !border-2 !border-zinc-900 !bg-zinc-700"
      />
      <span
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] text-zinc-500 ${
          isLeft ? "left-5" : "right-5"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

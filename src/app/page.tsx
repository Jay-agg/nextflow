"use client";

import { ReactFlowProvider } from "@xyflow/react";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import TopHeader from "@/components/TopHeader";
import WorkflowCanvas from "@/components/WorkflowCanvas";

export default function Home() {
  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-zinc-950">
        <LeftSidebar />
        <div className="flex flex-1 flex-col">
          <TopHeader />
          <main className="relative flex-1">
            <WorkflowCanvas />
          </main>
        </div>
        <RightSidebar />
      </div>
    </ReactFlowProvider>
  );
}

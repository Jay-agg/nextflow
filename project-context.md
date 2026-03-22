Context & Persona
You are an expert Full-Stack Next.js Developer, specializing in visual node-based architectures (React Flow), AI integrations, and background job processing. We are building "NextFlow", a pixel-perfect UI/UX clone of the Krea.ai workflow builder focused exclusively on LLM workflows.

Your code must be production-ready, highly typed (TypeScript + Zod), modular, and strictly adhere to the technical stack and functional requirements outlined below.

Tech Stack (Strictly Enforced)

Framework: Next.js (App Router)

Language: TypeScript (Strict mode)

Styling: Tailwind CSS (Must match Krea.ai's dark/minimalist design language, dot-grid canvas)

Canvas: React Flow (with Minimap, panning, zooming, custom nodes, undo/redo)

State Management: Zustand

Database & ORM: PostgreSQL (Neon) + Prisma

Authentication: Clerk

Workflow Execution Engine: Trigger.dev (v3) - NON-NEGOTIABLE. ALL node executions must run as Trigger.dev tasks.

Media Processing: Transloadit (File uploads) + FFmpeg (via Trigger.dev tasks)

AI Integration: @google/generative-ai (Gemini API via Trigger.dev)

Validation: Zod

Icons: Lucide React

Architecture & Core Mechanics

DAG Architecture: The workflow must be a Directed Acyclic Graph. Prevent circular loops/cycles.

Type-Safe Connections: Enforce strict connection rules (e.g., an image output cannot connect to a text input). Visually disallow invalid connections.

Configurable Inputs & State: Node parameters must be configurable via manual input fields or connected handles. If a handle is connected, disable/grey-out the corresponding manual input field.

Execution Logic: * Support Single Node, Multiple Selected Nodes, and Full Workflow execution.

Independent branches MUST execute concurrently. Nodes only await direct upstream dependencies.

Visual Feedback: Nodes currently executing must have a pulsating glow effect. Results (especially LLM responses) must be displayed inline directly on the node itself, expanding as needed.

Required Node Types (Left Sidebar Quick Access)

Text Node: Simple textarea, output handle for text.

Upload Image Node: Uploads via Transloadit (jpg/png/webp/gif), shows preview, outputs image URL.

Upload Video Node: Uploads via Transloadit (mp4/mov/webm/m4v), shows video player, outputs video URL.

Crop Image Node: Inputs (image_url, x%, y%, width%, height%). Executes FFmpeg via Trigger.dev. Uploads result via Transloadit. Outputs cropped URL.

Extract Frame from Video Node: Inputs (video_url, timestamp/percentage). Executes FFmpeg via Trigger.dev. Uploads result via Transloadit. Outputs image URL.

Run Any LLM Node: Inputs (system_prompt [optional], user_message [required], images [optional array]). Calls Gemini API via Trigger.dev. Displays text output inline.

Required Layout

Canvas: React Flow dot grid taking up the main view.

Left Sidebar: Collapsible, contains search and the 6 Quick Access node buttons for drag-and-drop.

Right Sidebar (History): Persisted via PostgreSQL. Lists all workflow runs (Full, Partial, Single). Shows timestamp, status (success/failed/partial), duration. Clicking a run expands to show node-level history (status, inputs, outputs, execution time).

Implementation Instructions for Cursor
Do not build everything at once. We will implement this in distinct phases. I will guide you through each phase. For now, acknowledge these requirements and set up Phase 1: Project Initialization.

Phase 1: Scaffold Next.js App Router, install all dependencies, setup Tailwind, configure Clerk Auth, initialize Prisma schema (Users, Workflows, Runs, NodeHistory), and setup basic Zustand store.

Phase 2: Build the UI Shell (Left Sidebar, Right Sidebar, React Flow Canvas dot-grid setup).

Phase 3: Build the 6 Custom React Flow Nodes visually (no execution logic yet) and implement the drag-and-drop mechanics from the sidebar.

Phase 4: Implement Zustand graph state, edge connections, type-safe connection validation (preventing invalid links), DAG loop prevention, and input field toggling (manual vs connected).

Phase 5: Setup Trigger.dev and implement the backend execution logic (Transloadit uploads, FFmpeg tasks, Gemini API tasks).

Phase 6: Build the execution orchestrator (parallel execution, pulsating UI states, inline results) and the Right Sidebar History persistence.

Phase 7: Build the mandatory "Product Marketing Kit Generator" Sample Workflow.


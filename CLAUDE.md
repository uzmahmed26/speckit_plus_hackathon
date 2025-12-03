# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Usage

The following commands are commonly used for development in this repository:

**Docusaurus Frontend:**
- `npm install`: Installs Node.js dependencies.
- `npm start`: Starts the Docusaurus development server (usually at `http://localhost:3000`).
- `npm run build`: Builds the static Docusaurus site.
- `npm test`: Runs Jest tests for the frontend.
- `npm run typecheck`: Performs TypeScript type checking.
- `npm run deploy`: Deploys the Docusaurus site.

**FastAPI Backend:**
- `pip install -r backend/requirements.txt`: Installs Python dependencies.
- `uvicorn backend.main:app --reload`: Starts the FastAPI development server (usually at `http://0.0.0.0:8000`), with hot-reloading.
- `python backend/ingest.py`: Ingests data into the RAG system's knowledge base.

## High-Level Code Architecture

This repository contains two main components:

1.  **Docusaurus Frontend (Book):** Located in the root directory, `docs/`, `src/`, `static/`, and configuration files like `docusaurus.config.ts`, `sidebars.ts`. This is a React-based static site that serves as the "Spec-Driven AI Book". It includes an integrated RAG chatbot embedded within the site.

2.  **FastAPI Backend (RAG Chatbot):** Located in the `backend/` directory. This is a Python-based REST API built with FastAPI and `uvicorn`. It handles:
    *   **Authentication and User Management:** Manages user sessions and access.
    *   **RAG Chatbot Core:** Implements the Retrieval-Augmented Generation logic using OpenAI for inference and Qdrant Cloud for vector database capabilities. It also supports "answer only from selected text" mode.
    *   **Data Ingestion:** Processes and stores book content into the vector database.

The frontend communicates with the backend via API calls for features like authentication (`/api/auth`) and chatbot queries (`/api/query`).

## Project-Specific Claude Code Instructions

This repository uses Spec-Kit Plus. Key commands for Claude Code are:

-   `/sp.constitution`: Define project scope and constraints.
-   `/sp.specify`: Detail features for the Docusaurus book and RAG chatbot.
-   `/sp.plan`: Copy/paste from `plans/001-implementation/plan.md`.
-   `/sp.tasks`: Copy/paste from `tasks/tasks.md`.
-   `/sp.implement`: Implement tasks 1..8 to scaffold and generate missing files.

After scaffolding, review files in `book/` and `backend/` and run local tests.

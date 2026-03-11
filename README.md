# UI Architect

### 🚀 Minimum Viable Product (MVP) Core Architecture

**UI Architect** acts as the foundational scaffolding for building highly dynamic, data-rich user interfaces fused with intelligent AI-driven python backends.

## 🎯 Why Was This Published?

This repository was published and separated from experimental local workspaces to establish a clean, strictly organized, and reliable baseline project skeleton. By committing to version control from day one:
1. We protect the core UI architecture from being tangled with local python script experiments (`.venv` configurations, PDF files, temporary test data).
2. We enable safe, iterative development of a premium front-end experience.
3. We set up an isolated track for deploying machine learning, PDF manipulation, or Langchain scripts directly through an integrated API.

## 💡 Why Is This Architecture Useful?

The project is intentionally bifurcated to maximize both aesthetic capabilities and backend processing power:

### 1. The Dashboard Frontend (React + Vite + TypeScript)
- **Extensible Grid System**: Uses `react-grid-layout` to provide a draggable, responsive, and customizable widget grid framework.
- **Premium Design Baseline**: Incorporates CSS Modules and global aesthetic design variables allowing for immediate scaling into beautiful, dark-mode, or glassmorphism themes without risking CSS conflicts.
- **Scalable Performance**: Initialized using Vite and strict TypeScript, ensuring real-time UI modifications and long-term project maintainability. 

### 2. The AI & Utility Backend (FastAPI + Python)
- **Decoupled Logic Server**: Uses a FastAPI (`main.py`) layer out-of-the-box to serve both API endpoints and the static React build cleanly on the same port.
- **Plug-and-Play Processing**: Python tools (like `process_form.py` utilizing `pypdf`, OpenAI, Langchain, etc.) exist alongside the UI and can be securely triggered via API calls from the React dashboard.
- **Immediate Value Execution**: Solves the problem of "How do I securely run heavy computational utility scripts through an elegant interactive dashboard?"

## 🛠 Usage & Quickstart

To build the React application and run the backend server simultaneously, run the included executable:
```bash
./run_mvp.sh
```

Alternatively, you can run them manually:
1. **Frontend dev**: `npm install && npm run dev`
2. **Backend API**: `source .venv/bin/activate && uvicorn main:app --reload`

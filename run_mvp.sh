#!/bin/bash
echo "Building UI Architect Frontend..."
npm run build

echo "Starting UI Architect Backend..."
source .venv/bin/activate
uvicorn main:app --host 127.0.0.1 --port 8000

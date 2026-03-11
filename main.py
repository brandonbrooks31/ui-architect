from fastapi import FastAPI, UploadFile, File, BackgroundTasks, Request
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import subprocess
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/process-form")
async def process_form(file: UploadFile = File(None)):
    if file:
        file_path = "FAA form 337.pdf"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    
    # Run the existing script
    subprocess.run(["python3", "process_form.py"], check=True)
    
    output_pdf = "Project_3_2_Final_Submission.pdf"
    if os.path.exists(output_pdf):
        return FileResponse(output_pdf, media_type='application/pdf', filename=output_pdf)
    return {"error": "Output file not generated"}

@app.post("/api/openclaw/chat")
async def openclaw_chat(request: Request):
    data = await request.json()
    
    url = "http://127.0.0.1:18789/v1/chat/completions"
    headers = {
        "Authorization": "Bearer mhN1prUL6_PZ498AYzgLhORJ_OgVY3hkilRgHQJZHmk",
        "Content-Type": "application/json",
        "x-openclaw-agent-id": data.get("agent_id", "main")
    }
    
    if "model" not in data:
        data["model"] = "openclaw"
        
    async def stream_response():
        async with httpx.AsyncClient() as client:
            async with client.stream("POST", url, headers=headers, json=data, timeout=300.0) as response:
                async for chunk in response.aiter_bytes():
                    yield chunk

    if data.get("stream", False):
        return StreamingResponse(stream_response(), media_type="text/event-stream")
    else:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=data, timeout=300.0)
            return response.json()

# Serve the React build directory at the root
if os.path.isdir("dist"):
    app.mount("/", StaticFiles(directory="dist", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

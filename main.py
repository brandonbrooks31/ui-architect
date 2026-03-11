from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import subprocess

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

# Serve the React build directory at the root
if os.path.isdir("dist"):
    app.mount("/", StaticFiles(directory="dist", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

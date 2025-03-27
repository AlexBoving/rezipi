from fastapi import FastAPI, UploadFile

app = FastAPI()

@app.post("/uploadfile/")
async def upload_file(file: UploadFile):
    return {"filename": file.filename, "message": "Upload successful"}

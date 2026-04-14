from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi.responses import JSONResponse
import requests

app=FastAPI()


MODEL=tf.keras.models.load_model("C:/Users/Antonia/Desktop/PlantDiseaseApp/models/4.keras")
print("Model loaded successfully")
CLASS_NAMES=["Early Blight", "Late Blight", "Healthy"]


# Permite cereri din orice origine
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
async def ping():
    return "Hello"

@app.get("/")
async def root():
    return {"message": "Welcome to my FastAPI application!"}


def read_file_as_image(data) -> np.ndarray:
    try:
        image= np.array(Image.open(BytesIO(data))) #read the bytes as image and convert it to numpy array
        print(f"Image shape: {image.shape}")
        return image
    except Exception as e:
        print(f"Failed to read image with error: {e}")
        return None

@app.post("/predict")
async def predict(
    #UploadFile is a data type here and File() is the default value
    file: UploadFile = File(...)
):
    image=read_file_as_image(await file.read())
    image_batch=np.expand_dims(image,0) #we do this because predict cant use a single image, only a batch

    #requests.post()

    predictions=MODEL.predict(image_batch)
    predicted_class= CLASS_NAMES[np.argmax(predictions[0])]
    #argmax = max index, max  = max value
    confidence=np.max(predictions[0])

    #return in a dictionary
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }


if __name__=="__main__":
    uvicorn.run(app,host='localhost',port=8000)

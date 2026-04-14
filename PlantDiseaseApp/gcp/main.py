from google.cloud import storage
import tensorflow as tf
from PIL import Image
import numpy as np

BUCKET_NAME="plantprojectbucket"

class_names=["Early Blight", "Late Blight", "Healthy"]

model=None
#variable for storing the model

#the application will run on another server on google cloud and that server 
#will be downloading the model from the bucket
def download_blob(bucket_name, source_blob_name, destination):
    storage_client = storage.Client()
    bucket=storage_client.get_bucket(bucket_name)
    blob=bucket.blob(source_blob_name)
    blob.download_to_filename(destination)

def predict(request):
    global model
    if model is None:
        download_blob(
            BUCKET_NAME,
            "models/4.keras",
            "/tmp/4.keras",
        )
        model = tf.keras.models.load_model("/tmp/4.keras")
        print("Model downloaded",model)

    try:
    
        image = request.files["file"]
        img = Image.open(image)
        img = img.resize((256, 256))
        image_array = np.array(img) 
        img_array = tf.expand_dims(image_array, 0)
        predictions = model.predict(img_array)
        predicted_class = class_names[np.argmax(predictions[0])]
        confidence = round(100 * np.max(predictions[0]), 2)
        
        return {"class": predicted_class, "confidence": confidence}
    except Exception as e:
        # În caz de eroare, se returnează un mesaj de eroare
        return str(e)


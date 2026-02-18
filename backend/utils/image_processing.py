import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Load your HDF5 model
model = load_model("models/flood_segmentation.h5")

IMG_SIZE = 256

def analyze_flood(image_path):
    # Read and preprocess image
    img = cv2.imread(image_path)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    # Predict mask
    mask = model.predict(img)[0]

    # Calculate flooded pixels
    flooded_pixels = np.sum(mask > 0.5)
    total_pixels = mask.size
    flood_percentage = (flooded_pixels / total_pixels) * 100

    # Determine severity
    if flood_percentage < 30:
        severity = "Mild"
    elif flood_percentage < 60:
        severity = "Moderate"
    else:
        severity = "Severe"

    return flood_percentage, severity

from PIL import Image, ImageDraw
import numpy as np
import json
import os
from tensorflow.keras.models import load_model

# ------------------------------------------
# Load model and mapping once at startup
# ------------------------------------------
MODEL_PATH = os.path.join("crop_disease", "models", "crop_disease_model.h5")
MAPPING_PATH = os.path.join("crop_disease", "disease_mapping.json")

try:
    model = load_model(MODEL_PATH)
    print(f"✅ Loaded model from {MODEL_PATH}")
except Exception as e:
    model = None
    print(f"⚠️ Could not load model: {e}")

try:
    with open(MAPPING_PATH, "r") as f:
        disease_mapping = json.load(f)
    print(f"✅ Loaded disease mapping ({len(disease_mapping)} entries)")
except Exception as e:
    disease_mapping = {}
    print(f"⚠️ Could not load disease mapping: {e}")

# ------------------------------------------
# Preprocess image for model
# ------------------------------------------
def preprocess_image(pil_image, target_size=(224, 224)):
    """
    Converts a PIL image to a NumPy array suitable for model prediction.
    """
    img = pil_image.resize(target_size)
    img_array = np.array(img) / 255.0  # normalize to 0-1
    img_array = np.expand_dims(img_array, axis=0)  # add batch dimension
    return img_array

# ------------------------------------------
# Predict disease using trained model
# ------------------------------------------
def predict_disease(pil_image):
    """
    Predicts disease using a trained CNN model.
    Returns disease name, cause, and remedy from mapping.
    """
    if model is None:
        return {
            "disease": "Unknown",
            "cause": "Model not loaded properly.",
            "remedy": "Please check backend logs for model path."
        }

    try:
        img_array = preprocess_image(pil_image)
        preds = model.predict(img_array)
        predicted_class = str(np.argmax(preds))

        disease_info = disease_mapping.get(predicted_class, {
            "disease": "Unknown",
            "cause": "Unknown",
            "remedy": "No remedy found"
        })

        return disease_info

    except Exception as e:
        print(f"❌ Prediction error: {e}")
        return {
            "disease": "Unknown",
            "cause": "Error during prediction.",
            "remedy": str(e)
        }

# ------------------------------------------
# Highlight diseased area (placeholder)
# ------------------------------------------
def highlight_disease(file_like):
    """
    Draws a simple bounding box as a visual placeholder.
    You can later replace this with real region detection.
    """
    img = Image.open(file_like).convert("RGB")
    draw = ImageDraw.Draw(img)
    width, height = img.size

    # Draw rectangle roughly around center
    box = (width * 0.25, height * 0.25, width * 0.75, height * 0.75)
    draw.rectangle(box, outline="red", width=5)

    return img

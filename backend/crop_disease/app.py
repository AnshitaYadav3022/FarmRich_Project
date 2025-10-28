from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from utils import preprocess_image, highlight_disease
from PIL import Image
import numpy as np
import json
import base64
from io import BytesIO
import os

app = Flask(__name__)
CORS(app)

# ----------------------------
# Load model & mapping safely
# ----------------------------
MODEL_PATH = "models/crop_disease_model.h5"
MAPPING_PATH = "disease_mapping.json"

model = load_model(MODEL_PATH)
with open(MAPPING_PATH) as f:
    mapping = json.load(f)

print("✅ Model and mapping loaded successfully.")

# ----------------------------
# Prediction Route
# ----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    try:
        # Open uploaded image
        image = Image.open(file).convert("RGB")

        # Preprocess and predict
        img_array = preprocess_image(image)
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction, axis=1)[0]

        print("Predicted class index:", predicted_class)

        result = mapping.get(str(predicted_class), {
            "disease": "Unknown",
            "cause": "Unknown",
            "remedy": "No remedy found"
        })

        # Highlight diseased area
        buffer = BytesIO()
        image.save(buffer, format="PNG")
        buffer.seek(0)
        highlighted = highlight_disease(buffer)

        # Convert highlighted image to base64
        output_buffer = BytesIO()
        highlighted.save(output_buffer, format="PNG")
        img_str = base64.b64encode(output_buffer.getvalue()).decode("utf-8")

        # Return JSON
        return jsonify({
            "disease": result["disease"],
            "cause": result["cause"],
            "remedy": result["remedy"],
            "image": img_str
        })

    except Exception as e:
        print("❌ Error during prediction:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)

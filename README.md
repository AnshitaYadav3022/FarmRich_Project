*🌾 FarmRich — Smart Crop Disease Detection and Marketplace*

*🚀 Overview*
FarmRich is a web application that helps farmers and agriculture enthusiasts detect crop diseases using AI-powered image analysis.
The platform also features a marketplace for purchasing farming supplies and resources.

*🧠 Features*
🌿 Crop Disease Detection — Upload a leaf image to detect diseases using a trained deep learning model.
🛒 Marketplace — Browse and buy essential farming supplies.
👨‍🌾 User-Friendly Interface — Built with React for a smooth, interactive experience.
🔐 Secure Authentication — Login and register to save your data and preferences.

*🧩 Tech Stack*
Frontend: React, Tailwind CSS
Backend: Flask (Python)
AI Model: TensorFlow / Keras
Database: (Optional — add if you used one, like SQLite, MongoDB, or Firebase)

*🖼️ How It Works*
Go to the Detection page.
Upload an image of a crop leaf.
The AI model predicts the disease name, cause, and remedy.
The result is displayed along with a highlighted disease area.

*⚙️ Local Setup*

1️⃣ Clone this repository
git clone https://github.com/AnshitaYadav3022/FarmRich-Project.git
cd FarmRich-Project

2️⃣ Backend setup
cd backend/crop_disease
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py

3️⃣ Frontend setup
cd frontend
npm install
npm start
Now open your browser at http://localhost:3000 🌐

*🧠 Model Info*
The AI model (crop_disease_model.h5) was trained using TensorFlow/Keras on a labeled crop disease dataset.
The mapping file (disease_mapping.json) contains human-readable names and remedies for detected diseases.

*🪴 License*
This project is open-source under the MIT License.

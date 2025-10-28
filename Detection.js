import React, { useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { FaLeaf, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import "./DiseaseDetection.css";

function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      setError("Please upload a leaf image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Prediction failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="disease-container">
      <div className="disease-card-wrapper">
        <h1 className="title">🌿 FarmRich Disease Detection</h1>
        <p className="subtitle">
          Upload a leaf image and get instant diagnosis with suggested cause and remedy.
        </p>

        <Card className="disease-card">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />

          {preview && <img src={preview} alt="Preview" className="preview-image" />}

          <Button
            variant="success"
            className="predict-btn"
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Analyzing...
                <FaLeaf className="ms-2" />
              </>
            ) : (
              "Detect Disease"
            )}
          </Button>

          {error && (
            <p className="error-text">
              <FaInfoCircle className="me-2" />
              {error}
            </p>
          )}

          {result && (
            <Card className="result-card">
              <h5 className="disease-name">
                <FaCheckCircle className="text-success me-2" />
                Disease: <span className="text-primary">{result.disease}</span>
              </h5>
              <p><strong>Cause:</strong> {result.cause}</p>
              <p><strong>Remedy:</strong> {result.remedy}</p>
              {result.image && (
                <img
                  src={`data:image/png;base64,${result.image}`}
                  alt="Highlighted"
                  className="highlighted-image"
                />
              )}
            </Card>
          )}
        </Card>
      </div>
    </div>
  );
}

export default DiseaseDetection;

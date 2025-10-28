// src/pages/Login.js
import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/images/login.jpg";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage(null);
  setError(null);

  try {
    const res = await axios.post("http://127.0.0.1:8000/login", formData);
    
    // Save token in localStorage
    localStorage.setItem("token", res.data.token);

    setMessage("✅ Login successful!");
    setTimeout(() => navigate("/dashboard"), 1500);
  } catch (err) {
    setError(err.response?.data?.detail || "Login failed. Try again.");
  }
};


  const renderField = (label, name, icon, type = "text", show = null, toggle = null, placeholder = "") => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginBottom: "12px",
        gap: "12px",
      }}
    >
      <label style={{ color: "#fff", fontWeight: "600", width: "120px", textAlign: "right" }}>
        {label}
      </label>

      <div style={{ width: "30px", display: "flex", justifyContent: "center" }}>
        {icon}
      </div>

      <input
        type={show !== null ? (show ? "text" : type) : type}
        placeholder={placeholder || label}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
        style={{
          flex: 1,
          minWidth: 0,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "10px",
          color: "#fff",
          padding: "6px 12px",
          height: "36px",
          fontSize: "14px",
        }}
      />

      {toggle && (
        <button
          type="button"
          onClick={toggle}
          style={{
            background: "transparent",
            border: "none",
            color: "#eee",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "10px",
      }}
    >
      {/* overlay blur */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0,0,0,0.35)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          width: "750px",
          maxWidth: "95%",
          padding: "15px 20px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          color: "#fff",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontWeight: "800",
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          🔑 Login
        </h1>

        {message && <Alert variant="success" className="text-center w-100">{message}</Alert>}
        {error && <Alert variant="danger" className="text-center w-100">{error}</Alert>}

        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          {renderField("Email", "email", <FaEnvelope style={{ color: "#eee", fontSize: "16px" }} />, "email")}
          {renderField(
            "Password",
            "password",
            <FaLock style={{ color: "#eee", fontSize: "16px" }} />,
            "password",
            showPassword,
            () => setShowPassword(!showPassword)
          )}

          {/* Centered Button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <Button
              type="submit"
              style={{
                width: "180px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0.14))",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
                fontWeight: "600",
                padding: "6px 0",
                transition: "all 0.22s ease",
                boxShadow: "0 0 8px rgba(255,255,255,0.12)",
              }}
            >
              Login
            </Button>
          </div>
        </form>

        <p className="mt-2 text-center" style={{ color: "#fff", fontSize: "14px" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#FFD700", textDecoration: "underline", fontWeight: 600 }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

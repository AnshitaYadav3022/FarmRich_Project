import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { FaEnvelope, FaUser } from "react-icons/fa";

function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 0
      }}></div>

      <Card
        className="p-4"
        style={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
          transition: "transform 0.3s, box-shadow 0.3s",
          position: "relative",
          zIndex: 1,
          color: "#fff"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.25)";
        }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: "700" }}>
          📬 Contact Us
        </h2>
        <p className="text-center mb-4">
          Have questions, suggestions, or want to collaborate? Send us a message and we will respond promptly.
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <div className="d-flex align-items-center">
              <FaUser className="me-2" />
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                style={{ borderRadius: "10px", backdropFilter: "blur(4px)" }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <div className="d-flex align-items-center">
              <FaEnvelope className="me-2" />
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={{ borderRadius: "10px", backdropFilter: "blur(4px)" }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message..."
              required
              style={{ borderRadius: "10px", backdropFilter: "blur(4px)" }}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100" disabled={loading}>
            {loading ? <><Spinner animation="border" size="sm" /> Sending...</> : "Send Message"}
          </Button>

          {submitted && (
            <p className="mt-3 text-success text-center">
              ✅ Your message has been sent successfully!
            </p>
          )}
        </Form>
      </Card>
    </div>
  );
}

export default ContactUs;

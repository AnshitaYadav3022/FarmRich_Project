import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">🌱 FarmRich</div>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/detection">Detection</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/marketplace">Marketplace</Link></li>
        <li><Link to="/supplies">Supplies</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>

        {/* Hamburger button */}
        <li>
          <button className="hamburger" onClick={() => navigate("/dashboard")}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

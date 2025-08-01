import React from "react";
import { Link } from "react-router-dom";
import ctImage from "../assets/ct-sample.jpg";
import "../styles/Demo.css";
import Navbar from "../components/Navbar.jsx";

const Demo = () => {
  return (
    <>
      <Navbar />

      <section className="demo-section">
        <img src={ctImage} alt="CT Scan" className="demo-image" />

        <div className="demo-info">
          <h3>Prediction Summary</h3>
          <p><strong>Patient:</strong> John Doe</p>
          <p><strong>Scan Date:</strong> 2025-05-12</p>
          <p><strong>AI Confidence:</strong> <span className="highlight">88%</span></p>
          <p><strong>Result:</strong> <span className="highlight risk">High Risk — Further evaluation recommended</span></p>
          <Link to="/" className="btn-primary">← Back to Home</Link>
        </div>
      </section>
    </>
  );
};

export default Demo;

import React from "react";
import "../styles/About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About the Lung Cancer Detection System</h1>
        <p>
          <strong>Lung Cancer Detection System</strong> is a modern web application
          designed to assist healthcare professionals in identifying lung cancer at
          an early stage using AI-powered medical imaging analysis.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>Early diagnosis of suspicious lung nodules</li>
          <li>CT scan upload and visualization</li>
          <li>AI confidence scoring with YOLOv11</li>
          <li>Treatment plan and medication management</li>
          <li>Patient profile and follow-up tracking</li>
        </ul>

        <h2>Technologies Used</h2>
        <ul>
          <li>Frontend: React (Vite), Custom CSS</li>
          <li>Backend: Node.js + PostgreSQL</li>
          <li>AI Model: Trained YOLOv11 with 30,000 images via Flask API</li>
        </ul>

        <h2>Developer</h2>
        <p>
          This project was developed by <strong>Seval Hatice Kayıkcı</strong> as part of a senior software
          engineering graduation project, with a mission to support life-saving early
          detection in lung cancer diagnosis through technology.
        </p>

        <div className="landing-buttons">
          <Link to="/login" className="glow-button">Get Started</Link>
          <Link to="/" className="glow-button">Back to Home</Link>

        </div>

        <p className="footer-note">© 2025 Lung Cancer Detection System</p>
      </div>
    </div>
  );
};

export default About;

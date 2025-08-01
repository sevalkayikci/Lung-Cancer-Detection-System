import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import {
  Upload,
  BrainCog,
  LineChart,
  FolderOpen,
  ScanSearch,
  Brain,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/navbar.png" alt="Logo" />
          <span>Lung Cancer Detection System</span>
        </div>
        <div className="navbar-links">
          <Link to="/login" className="nav-button">
            Login
          </Link>
        </div>
      </nav>

      <main className="hero-section">
        <h1>
          Early Detection <br /> <span className="highlight">Saves Lives</span>
        </h1>
        <p className="hero-subtext">
          A powerful AI-based platform for faster and more accurate lung cancer diagnosis.
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="btn-primary">
            Get Started
          </Link>
          <Link to="/demo" className="btn-secondary">
            Try Demo
          </Link>
          <Link to="/about" className="btn-secondary">
            Learn More
          </Link>
        </div>
      </main>

      <section className="how-it-works-section">
        <div className="section-inner">
          <h2 className="section-heading">How It Works</h2>
          <div className="steps-container">
            <div className="step-card small">
              <Upload className="step-icon" />
              <h3>Upload CT Scan</h3>
              <p>Simply upload your patient's chest CT image to get started.</p>
            </div>
            <div className="step-card small">
              <BrainCog className="step-icon" />
              <h3>AI Analysis</h3>
              <p>Our advanced YOLO model analyzes the image in real-time.</p>
            </div>
            <div className="step-card small">
              <LineChart className="step-icon" />
              <h3>Confidence Score</h3>
              <p>The system detects possible cancerous nodules with high precision.</p>
            </div>
            <div className="step-card small">
              <FolderOpen className="step-icon" />
              <h3>Track Diagnosis</h3>
              <p>All diagnosis results and patient history are securely stored.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="section-inner">
          <h2 className="section-heading">System Highlights</h2>
          <div className="stats-container">
            <div className="stat-card small">
              <ScanSearch className="stat-icon" />
              <h3>24,370 CT Images</h3>
              <p>Used from Cancer Image Archieve datasets</p>
            </div>
            <div className="stat-card small">
              <Brain className="stat-icon" />
              <h3>YOLOv11xL</h3>
              <p>Powerful hybrid model integration</p>
            </div>
            <div className="stat-card small">
              <CheckCircle2 className="stat-icon" />
              <h3>+90% Accuracy</h3>
              <p>Based on validation and test performance</p>
            </div>
            <div className="stat-card small">
              <ShieldCheck className="stat-icon" />
              <h3>100% Secure</h3>
              <p>Data encrypted and access controlled</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        © 2025 Lung Cancer Detection System · Seval Hatice Kayıkcı
      </footer>
    </div>
  );
};

export default LandingPage;

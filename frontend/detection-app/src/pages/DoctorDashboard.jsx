import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonRow from '../components/ButtonRow';
import MiniToDo from '../components/MiniToDo';
import '../styles/DoctorDashboard.css';
import { LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [isDoctor, setIsDoctor] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [patients, setPatients] = useState([]);
  const [latestScan, setLatestScan] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        if (decoded.role === "Doctor") {
          setDoctorInfo(decoded);
          setIsDoctor(true);
        } else {
          navigate("/unauthorized");
        }
      } catch (err) {
        console.error("Token error:", err);
        navigate("/login");
      }
    };

    const fetchPatients = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:8080/api/patient", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setPatients(data);
        } else {
          console.error("Fetch error:", data.message);
        }
      } catch (err) {
        console.error("Patients fetch error:", err);
      }
    };

    const fetchLatestScanFromStorage = () => {
      const stored = localStorage.getItem("latestDiagnosis");
      if (stored) {
        setLatestScan(JSON.parse(stored));
      }
    };

    fetchDoctor();
    fetchPatients();
    fetchLatestScanFromStorage();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!isDoctor) return null;

  const latestPatient = patients.length > 0 ? patients[patients.length - 1] : null;

  return (
    <div className="doctor-dashboard">
  
<header className="topbar">
  <Navbar />
  <div className="welcome-row">
    <h1>Welcome, Dr. {doctorInfo?.last_name?.toUpperCase() || "..."}</h1>
    
  </div>
</header>







      <p className="dashboard-quote">
        "Every scan tells a story. Every diagnosis changes a life."
      </p>

      <ButtonRow />

      <div className="dashboard-cards">
     
        {/* PATIENT SMALL */}
        <div className="patient-card">
          <h3>Patients</h3>
          <p>Total Patients: {patients.length}</p>
          <p>High Risk Patients: 4</p>
          <p>Recently Added: {latestPatient ? `${latestPatient.name} ${latestPatient.surname}` : "None"}</p>
        </div>

           {/* TO-DO WIDE */}
        <div className="todo-card">
          <MiniToDo />
        </div>


      </div>
    </div>
  );
};

export default DoctorDashboard;

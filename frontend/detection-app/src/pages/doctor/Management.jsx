import React, { useState, useEffect } from 'react';
import PatientSidebar from '../../components/PatientSidebar.jsx';
import PatientDetail from '../../components/PatientDetail.jsx';
import './Management.css';
import Navbar from '../../components/Navbar.jsx';
const Management = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:8080/api/patient', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setPatients(data);
      } catch (err) {
        console.error('Failed to load patients', err);
      }
    };

    fetchPatients();
  }, []);

  return (
   
    <div className="management-container">
      <Navbar />
      <PatientSidebar
        patients={patients}
        onSelectPatient={setSelectedPatient}
        selectedId={selectedPatient?.patient_id}
      />

      <div className="detail-section">
        {selectedPatient ? (
          <PatientDetail patient={selectedPatient} />
        ) : (
          <div className="placeholder-text">Select a patient to view details</div>
        )}
      </div>
    </div>
  );
};

export default Management;

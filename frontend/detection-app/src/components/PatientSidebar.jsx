import React, { useState } from 'react';
import '../styles/PatientSidebar.css';

const PatientSidebar = ({ patients, onSelectPatient, selectedId, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patient-sidebar">
      <div className="sidebar-top">
      
        <h3 className="sidebar-title">Patients</h3>
      </div>

      <input
        type="text"
        className="search-bar"
        placeholder="Search patient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="patient-list">
        {filteredPatients.map((patient) => (
          <li
            key={patient.patient_id}
            className={`patient-item ${selectedId === patient.patient_id ? 'active' : ''}`}
            onClick={() => onSelectPatient(patient)}
          >
            {patient.name} {patient.surname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientSidebar;

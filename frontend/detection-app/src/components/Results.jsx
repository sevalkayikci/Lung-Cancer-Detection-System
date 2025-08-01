import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Results.css';
import Navbar from '../components/Navbar';

const Results = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [scans, setScans] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  useEffect(() => {
    fetch('http://localhost:8080/api/patient', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error("Patient fetch error:", err));
  }, [token]);

  const handleSelect = async (id) => {
    setSelectedPatientId(id);
    setScans([]);

    try {
      const response = await fetch(`http://localhost:8080/api/diagnosis/patient/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (response.ok) setScans(data);
      else console.error("Scan fetch error:", data.message);
    } catch (error) {
      console.error("Scan fetch error:", error);
    }
  };

  const filteredPatients = patients.filter((p) =>
    `${p.name} ${p.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPatient = patients.find(p => p.patient_id === selectedPatientId);

  return (
    <div className="results-container">
      <Navbar />

      <div className="left-panel">
        <input
          type="text"
          className="search-input"
          placeholder="Search patient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className="patient-list">
          {filteredPatients.map((patient) => (
            <li
              key={patient.patient_id}
              className={selectedPatientId === patient.patient_id ? 'active' : ''}
              onClick={() => handleSelect(patient.patient_id)}
            >
              {patient.name} {patient.surname}
            </li>
          ))}
        </ul>
      </div>

      <div className="right-panel">
        {selectedPatient ? (
          <>
            <h3>{selectedPatient.name} {selectedPatient.surname} - Scan Results</h3>
            {scans.length > 0 ? (
              <ul className="scan-list">
                {scans.map((scan, index) => {
                  if (!scan.output_path || !scan.output_path.includes("LungScans")) return null;

                  const filename = scan.output_path.split('/').pop() || '';
                  const parts = filename.replace('.jpg', '').split('_');
                  const date = parts[1] || 'Unknown';
                  const time = parts[2]?.replaceAll('-', ':') || '';

                  return (
                    <li
                      key={scan.id || `${index}-scan`}
                      className="scan-item"
                      onClick={() => setSelectedScan(scan)}
                    >
                      <p><strong>Date:</strong> {date} {time}</p>
                      <p><strong>Confidence:</strong> {scan.confidence_score }</p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="placeholder">No scans found for this patient.</p>
            )}
          </>
        ) : (
          <p className="placeholder">Select a patient to view results.</p>
        )}
      </div>

      {selectedScan && selectedScan.output_path && (
        <div className="modal-overlay" onClick={() => setSelectedScan(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-x" onClick={() => setSelectedScan(null)}>✕</button>

            <h3>Scan Details</h3>
            <p><strong>Confidence:</strong> {selectedScan.confidence_score }</p>
            <p><strong>File:</strong> {selectedScan.output_path.split('/').pop()}</p>
            <img
              className="modal-image"
              src={`http://localhost:8080/lungscans/${selectedScan.output_path
                ?.split('LungScans')[1]
                ?.replaceAll('\\', '/')
                ?.replace(/^\/+/, '')}`}
              alt="Scan"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;

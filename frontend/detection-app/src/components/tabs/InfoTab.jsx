import React, { useEffect, useState } from 'react';
import './InfoTab.css';

const InfoTab = ({ patientId }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`http://localhost:8080/api/patient/${patientId}/info`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        setInfo(data);
        setLoading(false);
      } catch (err) {
        console.error("Info fetch error:", err.message);
        setLoading(false);
      }
    };

    if (patientId) fetchInfo();
  }, [patientId]);

  if (loading) return <p style={{ color: 'white' }}>Loading...</p>;
  if (!info) return <p style={{ color: 'white' }}>No info found.</p>;

  return (
    <div className="info-tab">
      <h2>Patient Info</h2>
      <div className="dashboard-card">
        <p><strong>Name:</strong> {info.name} {info.surname}</p>
        <p><strong>Birthday:</strong> {info.birthday?.slice(0, 10)}</p>
        <p><strong>Gender:</strong> {info.gender}</p>
        <p><strong>Phone:</strong> {info.phone}</p>
        <p><strong>Emergency:</strong> {info.emergency_phone}</p>
        <p><strong>Status:</strong> {info.status}</p>
      </div>

      <h3>Medications</h3>
      <ul>
        {info.medications?.length > 0 ? (
          info.medications.map((med, i) => (
            <li key={i}>
              {med.name} – {med.dosage} ({med.frequency})
            </li>
          ))
        ) : (
          <li>No medications listed.</li>
        )}
      </ul>

      <h3>Treatments</h3>
      <ul>
        {info.treatments?.length > 0 ? (
          info.treatments.map((treat, i) => (
            <li key={i}>
              {treat.type}
            </li>
          ))
        ) : (
          <li>No treatments listed.</li>
        )}
      </ul>

      <h3>Symptoms</h3>
      <ul>
        {info.symptoms?.length > 0 ? (
          info.symptoms.map((sym, i) => (
            <li key={i}>{sym}</li>
          ))
        ) : (
          <li>No symptoms reported.</li>
        )}
      </ul>

      {info.other_symptom && (
        <div className="other-symptom-box">
          <h4>Other Notes</h4>
          <p>{info.other_symptom}</p>
        </div>
      )}
    </div>
  );
};

export default InfoTab;

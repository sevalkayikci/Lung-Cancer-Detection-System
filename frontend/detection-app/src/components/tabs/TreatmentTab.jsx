import React, { useEffect, useState } from 'react';
import './TreatmentTab.css';

const TreatmentTab = ({ patientId }) => {
  const [treatmentTypes, setTreatmentTypes] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // get all treatment types
  useEffect(() => {
    fetch('http://localhost:8080/api/treatment-types')
      .then(res => res.json())
      .then(data => setTreatmentTypes(data))
      .catch(err => console.error('Treatment types fetch error:', err));
  }, []);

  // gwt treatments for the patient
  const fetchTreatments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/patient/${patientId}/treatments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setTreatments(data);
    } catch (err) {
      console.error('Treatments fetch error:', err);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchTreatments();
    }
  }, [patientId]);

  // add a new treatment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const body = {
      treatment_type_id: parseInt(selectedTypeId),
      start_date: startDate || new Date().toISOString(),
      end_date: endDate || null
    };

    try {
      const res = await fetch(`http://localhost:8080/api/patient/${patientId}/treatments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setSelectedTypeId('');
        setStartDate('');
        setEndDate('');
        fetchTreatments();
      } else {
        const errData = await res.json();
        console.error("POST error:", errData.message);
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="treatment-tab">
      <h3>Add New Treatment</h3>
      <form onSubmit={handleSubmit} className="treatment-form">
        <select
          value={selectedTypeId}
          onChange={(e) => setSelectedTypeId(e.target.value)}
          required
        >
          <option value="">Select Treatment Type</option>
          {treatmentTypes.map((type) => (
            <option key={type.treatment_type_id} value={type.treatment_type_id}>
              {type.treatment_type_name}
            </option>
          ))}
        </select>

        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End Date (optional):</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <h3>Previous Treatments</h3>
      <ul className="treatment-list">
        {treatments.length > 0 ? (
          treatments.map((treat, i) => {
            const typeName = treatmentTypes.find(t => t.treatment_type_id === treat.treatment_type_id)?.treatment_type_name;
            return (
              <li key={i}>
                 <strong>{typeName || 'Unknown'}</strong><br />
                 {new Date(treat.start_date).toLocaleDateString()}
                {treat.end_date && <> ➤ {new Date(treat.end_date).toLocaleDateString()}</>}
              </li>
            );
          })
        ) : (
          <p>No treatments yet for this patient.</p>
        )}
      </ul>
    </div>
  );
};

export default TreatmentTab;

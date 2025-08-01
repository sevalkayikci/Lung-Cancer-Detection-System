import React, { useEffect, useState } from 'react';
import './MedicationTab.css';

const MedicationTab = ({ patientId }) => {
  const [medications, setMedications] = useState([]);
  const [patientMeds, setPatientMeds] = useState([]);
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [selectedMedId, setSelectedMedId] = useState('');

  const dosageOptions = ["100mg", "250mg", "500mg", "750mg", "1000mg"];
  const frequencyOptions = ["1x daily", "2x daily", "3x daily", "Before bed", "Weekly"];

  // get all medications
  useEffect(() => {
    fetch('http://localhost:8080/api/medications')
      .then(res => res.json())
      .then(data => {
        console.log("İlaç listesi:", data);
        setMedications(data);
      })
      .catch(err => console.error('Medication fetch error:', err));
  }, []);

  // get patient medications
  const fetchPatientMeds = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/patient/${patientId}/medications`);
      const data = await res.json();
      console.log("Hasta ilaçları:", data);
      setPatientMeds(data);
    } catch (err) {
      console.error('Patient meds fetch error:', err);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatientMeds();
    }
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      medication_id: selectedMedId,
      dosage,
      frequency
    };

    await fetch(`http://localhost:8080/api/patient/${patientId}/medications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    setDosage('');
    setFrequency('');
    setSelectedMedId('');

    fetchPatientMeds();
  };

  return (
    <div className="medication-tab">
      <h3>Add New Medication</h3>
      <form onSubmit={handleSubmit}>
        <select value={selectedMedId} onChange={(e) => setSelectedMedId(e.target.value)} required>
          <option value="">Select Medication</option>
          {medications.map((med) => (
            <option key={med.medication_id} value={med.medication_id}>
              {med.medication_name}
            </option>
          ))}
        </select>

        <select value={dosage} onChange={(e) => setDosage(e.target.value)} required>
          <option value="">Select Dosage</option>
          {dosageOptions.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>

        <select value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
          <option value="">Select Frequency</option>
          {frequencyOptions.map((f, i) => (
            <option key={i} value={f}>{f}</option>
          ))}
        </select>

        <button type="submit">Add</button>
      </form>

      <h3>Current Medications</h3>
      <ul>
        {patientMeds.length > 0 ? (
          patientMeds.map((med, index) => {
            const medInfo = medications.find(m => m.medication_id === med.medication_id);
            return (
              <li key={index}>
                 {medInfo ? medInfo.medication_name : 'Unknown'} — {med.dosage} / {med.frequency}
              </li>
            );
          })
        ) : (
          <p style={{ marginTop: "1rem" }}>No medications added for this patient yet.</p>
        )}
      </ul>
    </div>
  );
};

export default MedicationTab;

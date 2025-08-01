import React, { useState } from 'react';
import './SymptomTab.css';

const SYMPTOMS = [
  "Persistent cough", "Coughing up blood", "Discolored phlegm", "Chest pain (especially when breathing or coughing)",
  "Shortness of breath", "Wheezing", "Hoarseness", "Frequent bronchitis or pneumonia",
  "Weight loss (unintentional)", "Loss of appetite", "Fatigue or weakness", "Night sweats", "Unexplained fever",
  "Bone pain (back, hips, etc.)", "Headache", "Seizures", "Balance problems",
  "Numbness/weakness in limbs", "Drooping eyelid / decreased sweating", "Shoulder/arm pain (especially left)",
  "Difficulty swallowing", "Facial/neck swelling", "Clubbing of fingers", "Symptoms of hypercalcemia",
  "SIADH-related symptoms", "Muscle weakness", "Skin rashes or itching"
];

const SymptomTab = ({ patientId }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [otherSymptom, setOtherSymptom] = useState('');

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    const payload = {
      patient_id: patientId,
      symptoms: selectedSymptoms,
      other: otherSymptom.trim()
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/api/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Symptoms saved successfully!');
        setSelectedSymptoms([]);
        setOtherSymptom('');
      } else {
        alert('Failed to save symptoms.');
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="symptom-tab">
      <h2>Symptom Checklist</h2>
      <div className="symptom-list">
        {SYMPTOMS.map((symptom, i) => (
          <label key={i} className="symptom-item">
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(symptom)}
              onChange={() => toggleSymptom(symptom)}
            />
            {symptom}
          </label>
        ))}
      </div>

      <div className="other-box">
        <label>Other:</label>
        <textarea
          placeholder="Enter any additional symptoms or notes..."
          value={otherSymptom}
          onChange={(e) => setOtherSymptom(e.target.value)}
        />
      </div>

      <button className="submit-btn" onClick={handleSubmit}>Save Symptoms</button>
    </div>
  );
};

export default SymptomTab;

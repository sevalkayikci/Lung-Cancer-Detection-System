import React, { useState, useEffect } from 'react';
import '../styles/AddPatient.css';

const AddPatient = ({ onSuccess, onCancel, showBackButton = false, existingPatient = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birthday: '',
    gender: '',
    phone: '',
    emergency_phone: '',
    notes: '',
    status_id: ''
  });

  const [statuses, setStatuses] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // if an existing patient is provided, edit the form with their data
  useEffect(() => {
    if (existingPatient) {
      setFormData({
        ...existingPatient,
        birthday: existingPatient.birthday?.slice(0, 10) || '',
      });
    }
  }, [existingPatient]);

  // fetch the list of statuses from the backend
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8080/api/status', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch status data');
        const data = await res.json();
        setStatuses(data);
      } catch (err) {
        console.error("Status fetch error:", err);
        setStatuses([]);
        setError("Failed to load vital status options.");
      }
    };
    fetchStatuses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const url = existingPatient
      ? `http://localhost:8080/api/patient/${existingPatient.patient_id}`
      : 'http://localhost:8080/api/patient';

    const method = existingPatient ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(existingPatient ? 'Patient updated successfully.' : 'Patient added successfully.');
        onSuccess?.();
      } else {
        throw new Error(result.message || 'Failed to save patient.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="add-patient-wrapper">
      <div className="patient-form-container">
        <h2 className="section-title">{existingPatient ? "Edit Patient" : "Add New Patient"}</h2>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <form onSubmit={handleSubmit} className="patient-form">
          <input type="text" name="name" placeholder="First Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="surname" placeholder="Last Name" value={formData.surname} onChange={handleChange} required />
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />

          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="" disabled hidden>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select name="status_id" value={formData.status_id} onChange={handleChange} required>
            <option value="" disabled hidden>Select Status</option>
            {Array.isArray(statuses) && statuses.map((status) => (
              <option key={status.status_id} value={status.status_id}>
                {status.status_name}
              </option>
            ))}
          </select>

          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input type="tel" name="emergency_phone" placeholder="Emergency Contact" value={formData.emergency_phone} onChange={handleChange} />
          <textarea name="notes" placeholder="Notes (optional)" value={formData.notes} onChange={handleChange} />

          <button type="submit">{existingPatient ? "Update" : "Save"}</button>
          {showBackButton && <button type="button" className="back-button" onClick={onCancel}>Back</button>}
        </form>
      </div>
    </div>
  );
};

export default AddPatient;

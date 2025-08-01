import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import './DoctorPatients.css';
import AddPatient from '../../components/AddPatient';
import Navbar from '../../components/Navbar';

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null); // NEW

  useEffect(() => {
    fetchPatients();
  }, []);

const fetchPatients = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('http://localhost:8080/api/patient', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch patients.');

    const sorted = data.sort((a, b) => a.patient_id - b.patient_id);

    setPatients(sorted);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const handleEditClick = (patient) => {
    setEditingPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPatient(null);
  };

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="doctor-patient-list-container">
      <div className="header-bar">
        <Navbar />
        <h2 className="section-title">Patients</h2>
        <button className="add-patient-button" onClick={() => setShowModal(true)}>
          + Add Patient
        </button>
      </div>

      <table className="patient-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Birthday</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Emergency Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, i) => (
            <tr key={p.patient_id || i}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>{p.surname}</td>
              <td>{p.birthday?.slice(0, 10)}</td>
              <td>{p.gender}</td>
              <td>{p.phone}</td>
              <td>{p.emergency_phone}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditClick(p)} title="Edit">
                  <Pencil size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay-fixed">
          <div className="modal-box">
            <button className="modal-close-button" onClick={closeModal}>✕</button>
            <AddPatient
  existingPatient={editingPatient} 
  onSuccess={() => {
    fetchPatients();
    closeModal();
  }}
  onCancel={closeModal}
/>

          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPatients;

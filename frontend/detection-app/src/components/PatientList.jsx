import React, { useEffect, useState } from 'react';
import '../styles/PatientList.css';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:8080/api/patient', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Error fetching patients');


        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/patient/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to delete patient');

      setPatients((prev) => prev.filter((p) => p.patient_id !== id));
      alert("Patient deleted successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="patient-list-container">
      <h2 className="section-title">Patient List</h2>
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
                <button
                  className="icon-button delete"
                  onClick={() => handleDelete(p.patient_id)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;

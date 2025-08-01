import React, { useEffect, useState } from 'react';
import '../styles/DoctorList.css';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Unauthorized');
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError('Failed to fetch doctors.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    document.documentElement.style.overflow = showModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [showModal]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete doctor.');
      setDoctors((prev) => prev.filter((doc) => doc.user_id !== id));
      alert("Doctor deleted successfully!");
    } catch (err) {
      alert("Failed to delete doctor.");
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setShowModal(true);
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/admin/users/${editingDoctor.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingDoctor),
      });

      if (!response.ok) throw new Error('Failed to update doctor.');
      setDoctors((prev) =>
        prev.map((doc) => (doc.user_id === editingDoctor.user_id ? editingDoctor : doc))
      );
      setShowModal(false);
      alert('Doctor updated successfully!');
    } catch (err) {
      alert('Failed to update doctor.');
    }
  };

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p className="text-red">{error}</p>;

  return (
    <div className="doctor-list">
      <h2 className="section-title">All Doctors</h2>

      <table className="doctor-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.user_id || index}>
              <td>{index + 1}</td>
              <td>{doctor.first_name} {doctor.last_name}</td>
              <td>{doctor.username}</td>
              <td>{doctor.status || 'Active'}</td>
              <td>
                <button className="icon-button edit" onClick={() => handleEdit(doctor)} title="Edit">
                  <Pencil size={16} />
                </button>
                <button className="icon-button delete" onClick={() => handleDelete(doctor.user_id)} title="Delete">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && editingDoctor && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="section-title">Edit Doctor</h2>
            <form onSubmit={handleUpdateDoctor}>
              <div className="input-grid">
                <div>
                  <label className="label">First Name</label>
                  <input type="text" value={editingDoctor.first_name} onChange={(e) => setEditingDoctor({ ...editingDoctor, first_name: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="label">Last Name</label>
                  <input type="text" value={editingDoctor.last_name} onChange={(e) => setEditingDoctor({ ...editingDoctor, last_name: e.target.value })} className="input" />
                </div>
              </div>
              <div className="input-grid">
                <div>
                  <label className="label">Username</label>
                  <input type="text" value={editingDoctor.username} onChange={(e) => setEditingDoctor({ ...editingDoctor, username: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="label">Status</label>
                  <select value={editingDoctor.status} onChange={(e) => setEditingDoctor({ ...editingDoctor, status: e.target.value })} className="input">
                    <option value="Active">Active</option>
                    <option value="Pending">Pending Verification</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-footer button-group">
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-button">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;

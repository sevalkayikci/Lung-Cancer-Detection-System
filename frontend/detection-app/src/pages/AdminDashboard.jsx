import React, { useEffect, useState } from 'react';
import '../styles/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { UserPlus, UserCheck, Users, Upload, FileSearch } from 'lucide-react';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      if (decoded.role === "Admin") {
        setIsAdmin(true);
      } else {
        navigate("/unauthorized");
      }
    } catch (err) {
      navigate("/login");
    }
  }, [navigate]);

  if (!isAdmin) return null;

  return (
    <div className="dashboard-container">
          <Navbar />  
      <div className="admin-header">
        <h1>Welcome, Admin Panel</h1>
          <p>Manage doctors, patients, and scan results efficiently.</p>
      </div>

      <div className="admin-actions-row">
        <div className="admin-action-card" onClick={() => navigate('/admin/add-doctor')}>
        <UserPlus size={28} className="card-icon" />
          <h3>Add Doctor</h3>
        </div>
        <div className="admin-action-card" onClick={() => navigate('/admin/doctor-list')}>
          <UserCheck size={28} className="card-icon" />
          <h3>View Doctors</h3>
        </div>
        <div className="admin-action-card" onClick={() => navigate('/admin/add-patient')}>
          <Users size={28} className="card-icon" />
          <h3>Add Patient</h3>
        </div>
        <div className="admin-action-card" onClick={() => navigate('/admin/patient-list')}>
          <FileSearch size={28} className="card-icon" />
          <h3>View Patients</h3>
        </div>
        <div className="admin-action-card" onClick={() => navigate('/admin/upload-scan')}>
          <Upload size={28} className="card-icon" />
          <h3>Uploads</h3>
        </div>
        <div className="admin-action-card" onClick={() => navigate('/admin/results')}>
          <FileSearch size={28} className="card-icon" />
          <h3>Results</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

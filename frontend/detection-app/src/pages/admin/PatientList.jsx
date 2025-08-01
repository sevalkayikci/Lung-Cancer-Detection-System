import React from 'react';
import Navbar from '../../components/Navbar';
import PatientList from '../../components/PatientList';
import '../../styles/AdminDashboard.css';

const PatientListPage = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <PatientList />
    </div>
  );
};

export default PatientListPage;

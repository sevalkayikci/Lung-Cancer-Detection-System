import React from 'react';
import Navbar from '../../components/Navbar';
import DoctorList from '../../components/DoctorList';
import '../../styles/AdminDashboard.css';

const DoctorListPage = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <DoctorList />
    </div>
  );
};

export default DoctorListPage;

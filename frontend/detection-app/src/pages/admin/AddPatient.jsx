import React from 'react';
import Navbar from '../../components/Navbar';
import AddPatient from '../../components/AddPatient';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminDashboard.css';



const AddPatientPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Navbar />
      <AddPatient/> 
    </div>
  );
};

export default AddPatientPage;

import React from 'react';
import Navbar from '../../components/Navbar';
import AddUser from '../../components/AddUser';
import '../../styles/AdminDashboard.css';

const AddDoctor = () => {
  return (
    <div className="modal-page">
      <Navbar />
      <div className="modal-wrapper"> 
        <AddUser />
      </div>
    </div>
  );
};

export default AddDoctor;

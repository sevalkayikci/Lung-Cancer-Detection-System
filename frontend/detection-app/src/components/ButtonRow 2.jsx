import React from 'react';
import { Upload, Users, CheckCircle, FileText, HeartPulse, UserSquare } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import '../styles/ButtonRow.css';

const ButtonRow = () => {
  const navigate = useNavigate();

  return (
    <div className="lcds-icon-row">
      <div className="lcds-icon-button" onClick={() => navigate("/doctor/upload-scan")}>
        <Upload size={30} />
        <span>Upload</span>
      </div>
      
      <div className="lcds-icon-button" onClick={() => navigate("/doctor/add-patient")}>
        <UserSquare size={30} />
        <span>Patients</span>
      </div>

      <div className="lcds-icon-button" onClick={() => navigate("/doctor/results")}>
        <CheckCircle size={30} />
        <span>Results</span>
      </div>

    

      <div className="lcds-icon-button" onClick={() => navigate("/doctor/management")}>
        <HeartPulse size={30} />
        <span>Management</span>
      </div>
    </div>
  );
};

export default ButtonRow;

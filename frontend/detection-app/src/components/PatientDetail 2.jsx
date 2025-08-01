import React, { useState } from 'react';
import InfoTab from './tabs/InfoTab.jsx';
import NotesTab from './tabs/NotesTab.jsx';
import TreatmentTab from './tabs/TreatmentTab.jsx';
import MedicationTab from './tabs/MedicationTab.jsx';
import CtScanTab from './tabs/CtScanTab.jsx';
import SymptomTab from './tabs/SymptomTab.jsx';

import '../styles/PatientDetail.css';

const PatientDetail = ({ patient }) => {
  const [activeTab, setActiveTab] = useState('info');

  const renderTab = () => {
    switch (activeTab) {
      case 'info':
        return <InfoTab patientId={patient.patient_id} />;
      case 'notes':
        return <NotesTab patientId={patient.patient_id} />;
      case 'treatment':
        return <TreatmentTab patientId={patient.patient_id} />;
      case 'medication':
        return <MedicationTab patientId={patient.patient_id} />;
      case 'scans':
        return <CtScanTab patientId={patient.patient_id} />;
      case 'symptoms':
        return <SymptomTab patientId={patient.patient_id} />;
      default:
        return null;
    }
  };

  return (
    <div className="patient-detail-container">
      <h2 className="patient-name">{patient.name} {patient.surname}</h2>

      <div className="tabs">
        <button
          className={activeTab === 'info' ? 'active' : ''}
          onClick={() => setActiveTab('info')}
        >
          Info
        </button>
        <button
          className={activeTab === 'notes' ? 'active' : ''}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
        <button
          className={activeTab === 'treatment' ? 'active' : ''}
          onClick={() => setActiveTab('treatment')}
        >
          Treatment
        </button>
        <button
          className={activeTab === 'medication' ? 'active' : ''}
          onClick={() => setActiveTab('medication')}
        >
          Medication
        </button>
         <button
          className={activeTab === 'symptoms' ? 'active' : ''}
          onClick={() => setActiveTab('symptoms')}
        >
          Symptoms
        </button>
        <button
          className={activeTab === 'scans' ? 'active' : ''}
          onClick={() => setActiveTab('scans')}
        >
          CT Scans
        </button>
       
      </div>

      <div className="tab-content">
        {renderTab()}
      </div>
    </div>
  );
};

export default PatientDetail;

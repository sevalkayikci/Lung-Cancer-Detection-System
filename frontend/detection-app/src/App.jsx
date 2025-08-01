import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import Login from './pages/Login';
import About from "./pages/About";
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import Forbidden from './components/Forbidden';
import AddDoctor from './pages/admin/AddUser';
import AddPatientPage from './pages/admin/AddPatient';
import DoctorListPage from './pages/admin/DoctorList';
import PatientListPage from './pages/admin/PatientList';
import UploadScan from './components/UploadScan';
import Demo from './pages/Demo';
import Results from './components/Results';
import DoctorPatients from './pages/doctor/DoctorPatients';
import Management from './pages/doctor/Management';

const App = () => {
  useEffect(() => {
    document.title = "Lung Cancer Detection System";
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/unauthorized" element={<Forbidden />} />
        <Route path="/admin/add-doctor" element={<AddDoctor />} />
        <Route path="/admin/add-patient" element={<AddPatientPage />} />
        <Route path="/admin/doctor-list" element={<DoctorListPage />} />
        <Route path="/admin/patient-list" element={<PatientListPage />} />
        <Route path="/admin/upload-scan" element={<UploadScan />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/admin/results" element={<Results />} />

        // doctor routes
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/add-patient" element={<DoctorPatients />} />
        <Route path="/doctor/upload-scan" element={<UploadScan />} />
        <Route path="/doctor/results" element={<Results />} />
        <Route path="/doctor/management" element={<Management />} />




     
      </Routes>
    </Router>
  );
};

export default App; 


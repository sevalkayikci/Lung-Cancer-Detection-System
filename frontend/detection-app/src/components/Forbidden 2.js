import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Forbidden.css'; 

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="forbidden-page">
      <h1>403 - Access Denied</h1>
      <p>You don’t have permission to view this page.</p>
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
};

export default Forbidden;

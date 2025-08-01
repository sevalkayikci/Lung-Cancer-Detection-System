import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import logo from '../assets/login-logo.png'; 

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        // save
        localStorage.setItem('token', result.token);

  
        // check
        if (result.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/doctor');
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Server error, please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {logo && (
          <div className="logo-wrapper">
          <img src={logo} alt="Logo" className="login-logo" />
          <p className="logo-text">Login</p>
        </div>
        
        )}

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 

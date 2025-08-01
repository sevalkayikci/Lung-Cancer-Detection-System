import React from 'react';
import { LogOut, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleSafeBack = () => {
    const pathname = location.pathname;

    if (pathname.startsWith('/admin')) {
      navigate('/admin');
    } else if (pathname.startsWith('/doctor')) {
      navigate('/doctor');
    } else {
      navigate(-1); 
    }
  };

  const handleTitleClick = () => {
    if (location.pathname.startsWith('/admin')) {
      navigate('/admin');
    } else if (location.pathname.startsWith('/doctor')) {
      navigate('/doctor');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src="/navbar.png" alt="Logo" className="navbar-logo" />
        <span className="navbar-title clickable-title" onClick={handleTitleClick}>
          Lung Cancer Detection System
        </span>
      </div>

      <div className="navbar-right">
        <button className="home-button" onClick={handleSafeBack} title="Go Back">
          <Home size={20} />
        </button>

        <button className="logout-button" onClick={handleLogout} title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;

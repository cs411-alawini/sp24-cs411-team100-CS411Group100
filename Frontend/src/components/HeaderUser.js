import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeaderUser.css';
import logoImage from '../assets/logo_white.png';

function HeaderUser({ logoWidth = '60px' }) {  // Default width passed as prop
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goToSettings = () => {
    navigate('/settingsuser');
  };

  return (
    <div className="header">
      <div className="logo-header">
        <img src={logoImage} alt="DollarIQ" style={{ width: logoWidth }} />
      </div>
      <div className="navigation">
        <button className="nav-button" onClick={goToSettings}>Settings</button>
        <button className="nav-button" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default HeaderUser;
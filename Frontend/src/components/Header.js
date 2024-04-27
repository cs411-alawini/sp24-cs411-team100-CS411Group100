import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="header">
      <div className="logo">Logo</div>
      <div className="navigation">
        <button className="nav-button" onClick={goToSettings}>Settings</button>
        <button className="nav-button" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default Header;
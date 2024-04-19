import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Clear user token or any auth state from local storage or context
    localStorage.removeItem('token');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="logo">Logo</div>
      <div className="navigation">
        <button className="nav-button">Settings</button>
        <button className="nav-button" onClick={handleLogout}>Log Out</button> {/* Add onClick event handler */}
      </div>
    </div>
  );
}

export default Header;

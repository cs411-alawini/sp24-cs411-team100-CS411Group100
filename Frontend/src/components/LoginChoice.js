import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginChoice.css';
import logoImage from '../assets/logo.png'; // Assuming the logo is stored in src/assets

function LoginChoice() {
  let navigate = useNavigate();

  const navigateToLogin = (userType) => {
    navigate(`/login/${userType}`);
  };

  return (
    <div className="login-choice">
      <div className="logo">
        <img src={logoImage} alt="DollarIQ" />
      </div>
      <button onClick={() => navigateToLogin('admin')} className="login-button">Admin Login</button>
      <button onClick={() => navigateToLogin('user')} className="login-button">User Login</button>
    </div>
  );
}

export default LoginChoice;
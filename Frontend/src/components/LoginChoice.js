import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import '../styles/LoginChoice.css';

function LoginChoice() {
  let navigate = useNavigate(); // useNavigate instead of useHistory

  const navigateToLogin = (userType) => {
    navigate(`/login/${userType}`);
  };

  return (
    <div className="login-choice">
      <div className="Logo">DollarIQ</div>
      <button onClick={() => navigateToLogin('admin')} className="login-button">Admin Login</button>
      <button onClick={() => navigateToLogin('user')} className="login-button">User Login</button>
    </div>
  );
}

export default LoginChoice;

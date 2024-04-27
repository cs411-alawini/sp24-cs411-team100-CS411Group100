import React from 'react';
import '../styles/SettingsPage.css';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      <div className="settings-button-row">
        <button className="setting-option" onClick={() => console.log('Change Password API Call')}>Change Password</button>
        <button className="setting-option" onClick={() => console.log('Add Account API Call')}>Add Account</button>
        <button className="setting-option" onClick={() => console.log('Delete Account API Call')}>Delete Account</button>
        <button className="setting-option" onClick={() => console.log('Delete All Accounts API Call')}>Delete All Accounts</button>
        <button className="setting-option back-to-dashboard" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default SettingsPage;
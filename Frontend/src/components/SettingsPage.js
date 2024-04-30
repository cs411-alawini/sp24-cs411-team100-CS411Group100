import React, { useState } from 'react';
import '../styles/SettingsPage.css';
import { useNavigate } from 'react-router-dom';
import AddAccountComponent from './AddAccountComponent';
import DeleteAccountComponent from './DeleteAccountComponent';

function SettingsPage() {
    const navigate = useNavigate();
    const [showAddAccount, setShowAddAccount] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false); // State to control showing the delete confirmation

    const handleBack = () => {
        navigate(-1);
    };

    const toggleAddAccount = () => {
        setShowAddAccount(!showAddAccount);
    };

    const handleDeleteAccountClick = () => {
        setShowDeleteAccount(true);
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>
            <div className="settings-button-row">
                <button className="setting-option" onClick={() => console.log('View User Details')}>View User Details</button>
                <button className="setting-option" onClick={toggleAddAccount}>Add Account</button>
                <button className="setting-option" onClick={handleDeleteAccountClick}>Delete Account</button>
                <button className="setting-option" onClick={() => console.log('Delete All Accounts')}>Delete All Accounts</button>
                <button className="setting-option back-to-dashboard" onClick={handleBack}>Back</button>
            </div>
            {showAddAccount && <AddAccountComponent />}
            {showDeleteAccount && <DeleteAccountComponent setShowDeleteAccount={setShowDeleteAccount} />}
        </div>
    );
}

export default SettingsPage;

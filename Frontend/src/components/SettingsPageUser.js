import React, { useState } from 'react';
import '../styles/SettingsPageUser.css';
import { useNavigate } from 'react-router-dom';
import AddAccountComponent from './AddAccountComponent';
import DeleteAccountComponent from './DeleteAccountComponent';
import UserDetailsComponent from './UserDetailsComponent';
import DeleteUserComponent from './DeleteUserComponent';

function SettingsPageUser() {
    const navigate = useNavigate();
    const [showAddAccount, setShowAddAccount] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [showDeleteUser, setShowDeleteUser] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const toggleAddAccount = () => {
        setShowAddAccount(!showAddAccount);
        setShowDeleteAccount(false);
        setShowUserDetails(false);
    };

    const toggleUserDetails = () => {
        setShowUserDetails(!showUserDetails);
        setShowAddAccount(false);
        setShowDeleteAccount(false);
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>
            <div className="settings-button-row">
                <button className="setting-option" onClick={toggleUserDetails}>View User Details</button>
                <button className="setting-option" onClick={toggleAddAccount}>Add Account</button>
                <button className="setting-option" onClick={() => setShowDeleteUser(true)}>Delete User</button>
                <button className="setting-option back-to-dashboard" onClick={handleBack}>Back</button>
            </div>
            {showAddAccount && <AddAccountComponent />}
            {showDeleteAccount && <DeleteAccountComponent setShowDeleteAccount={setShowDeleteAccount} />}
            {showUserDetails && <UserDetailsComponent />}
            {showDeleteUser && <DeleteUserComponent setShowDeleteUser={setShowDeleteUser} />}
        </div>
    );
}

export default SettingsPageUser;
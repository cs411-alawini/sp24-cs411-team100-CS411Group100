import React, { useState } from 'react';
import '../styles/SettingsPageAccount.css';  // Make sure the path is correct for your CSS
import { useNavigate } from 'react-router-dom';
// import AddAccountComponent from './AddAccountComponent';
import DeleteAccountComponent from './DeleteAccountComponent';
// import UserDetailsComponent from './UserDetailsComponent';
import UpdateAccountComponent from './UpdateAccountComponent';  // Import the new component

function SettingsPageAccount() {
    const navigate = useNavigate();
    // const [showAddAccount, setShowAddAccount] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    // const [showUserDetails, setShowUserDetails] = useState(false);
    const [showUpdateAccount, setShowUpdateAccount] = useState(false); // State to toggle UpdateAccountComponent

    const handleBack = () => {
        navigate(-1);
    };

    // const toggleAddAccount = () => {
    //     setShowAddAccount(!showAddAccount);
    //     setShowDeleteAccount(false);
    //     setShowUserDetails(false);
    //     setShowUpdateAccount(false); // Ensure this is reset
    // };

    const handleDeleteAccountClick = () => {
        setShowDeleteAccount(!showDeleteAccount);
        // setShowAddAccount(false);
        // setShowUserDetails(false);
        setShowUpdateAccount(false); // Ensure this is reset
    };

    // const toggleUserDetails = () => {
    //     setShowUserDetails(!showUserDetails);
    //     setShowAddAccount(false);
    //     setShowDeleteAccount(false);
    //     setShowUpdateAccount(false); // Ensure this is reset
    // };

    const handleUpdateAccountClick = () => {
        setShowUpdateAccount(!showUpdateAccount);
        // setShowAddAccount(false);
        setShowDeleteAccount(false);
        // setShowUserDetails(false);
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>
            <div className="settings-button-row-acc">
                {/* <button className="setting-option" onClick={toggleUserDetails}>View User Details</button> */}
                {/* <button className="setting-option" onClick={toggleAddAccount}>Add Account</button> */}
                <button className="setting-option" onClick={handleUpdateAccountClick}>Update Account</button>
                <button className="setting-option" onClick={handleDeleteAccountClick}>Delete Account</button>
                <button className="setting-option back-to-dashboard" onClick={handleBack}>Back</button>
            </div>
            {/* {showAddAccount && <AddAccountComponent />} */}
            {showDeleteAccount && <DeleteAccountComponent setShowDeleteAccount={setShowDeleteAccount} />}
            {/* {showUserDetails && <UserDetailsComponent />} */}
            {showUpdateAccount && <UpdateAccountComponent setShowUpdateAccount={setShowUpdateAccount} />}
        </div>
    );
}

export default SettingsPageAccount;
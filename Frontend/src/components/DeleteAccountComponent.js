import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DeleteAccountComponent.css';

function DeleteAccountComponent({ setShowDeleteAccount }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        const accountId = localStorage.getItem('accountId');
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8000/api/account/${accountId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                setShowDeleteAccount(false);
                localStorage.removeItem('accountId');
                navigate('/accounts');
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="delete-container">
            <p className="confirmation-text">Are you sure you want to delete?</p>
            <button className="confirm-button yes" onClick={handleDelete}>Yes</button>
            <button className="confirm-button no" onClick={() => setShowDeleteAccount(false)}>No</button>
        </div>
    );
}

export default DeleteAccountComponent;
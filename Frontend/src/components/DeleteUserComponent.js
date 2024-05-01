import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DeleteAccountComponent.css'; // Reuse the same CSS for similar styling

function DeleteUserComponent({ setShowDeleteUser }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        // Assuming token should be dynamically retrieved from localStorage
        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("/api/user", requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(result => {
                console.log(result);
                alert('User deleted successfully.');
                if (typeof setShowDeleteUser === 'function') {
                    setShowDeleteUser(false);
                }
                navigate('/'); // Redirect to the home page or login page
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to delete the user.');
            });
    };

    return (
        <div className="delete-container">
            <p className="confirmation-text">Are you sure you want to delete your account?</p>
            <button className="confirm-button yes" onClick={handleDelete}>Yes</button>
            <button className="confirm-button no" onClick={() => setShowDeleteUser(false)}>No</button>
        </div>
    );
}

export default DeleteUserComponent;
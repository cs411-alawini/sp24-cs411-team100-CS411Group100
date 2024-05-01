import React, { useEffect, useState } from 'react';
import '../styles/UserDetailsComponent.css';

function UserDetailsComponent() {
    const [userDetails, setUserDetails] = useState({
        DateOfBirth: '',
        Gender: '',
        Password: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [notificationColor, setNotificationColor] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');  // Get token from local storage
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        fetch("/api/user", {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        })
        .then(response => response.json())
        .then(result => {
            setIsLoading(false);
            setUserDetails({
                DateOfBirth: result.user.DateOfBirth.split('T')[0], // Format to YYYY-MM-DD
                Gender: result.user.Gender,
                Password: result.user.Password
            });
        })
        .catch(error => console.error('Error:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');  // Get token from local storage
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const urlencoded = new URLSearchParams();
        urlencoded.append("Password", userDetails.Password);
        urlencoded.append("DateOfBirth", userDetails.DateOfBirth);
        urlencoded.append("Gender", userDetails.Gender);

        fetch("/api/user", {
            method: "PUT",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            setMessage("Account Updated Successfully");
            setNotificationColor("green");
            setTimeout(() => setMessage(''), 3000);  // Clear message after 3 seconds
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage("Error Updating Account");
            setNotificationColor("red");
            setTimeout(() => setMessage(''), 3000);  // Clear message after 3 seconds
        });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit} className="user-details-form">
            <div className="user-detail-field">
                <label>Date of Birth</label>
                <input type="date" name="DateOfBirth" value={userDetails.DateOfBirth} onChange={handleChange} className="user-detail-input" />
            </div>
            <div className="user-detail-field">
                <label>Gender</label>
                <input type="text" name="Gender" value={userDetails.Gender} onChange={handleChange} className="user-detail-input" />
            </div>
            <div className="user-detail-field">
                <label>Password</label>
                <input type="password" name="Password" value={userDetails.Password} onChange={handleChange} className="user-detail-input" />
            </div>
            <button type="submit" className="save-button">Save</button>
            {message && <div className={`message ${notificationColor}`}>{message}</div>}
        </form>
    );
}

export default UserDetailsComponent;
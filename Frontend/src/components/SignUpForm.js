import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpForm.css';

function SignUpForm() {
    const navigate = useNavigate();
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');
    const [notificationColor, setNotificationColor] = useState('red');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!password || password.length < 6 || !dateOfBirth || !gender) {
            showNotification('Invalid information', 'red', 3000);
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Cookie", "connect.sid=s%3Ap4rmRdOMWVPRv5qVxNHpn0EYWa-_PAsG.k%2BMyo%2Fr3as3hlCYQH%2FNK3LTv4VhbzIPMomr9SnRS%2B2E");

        const urlencoded = new URLSearchParams();
        urlencoded.append("Password", password);
        urlencoded.append("DateOfBirth", dateOfBirth);
        urlencoded.append("Gender", gender);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow"
        };

        fetch("/api/user", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === "User created successfully") {
                    showNotification(`Account Created Successfully. User ID: ${result.userId}`, 'green', 10000);
                    setTimeout(() => navigate('/login/user'), 10000); // Navigate back to login after 10 seconds
                } else {
                    showNotification('Invalid information', 'red', 3000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Registration failed. Please try again later.', 'red', 3000);
            });
    };

    const showNotification = (message, color, duration) => {
        setNotificationColor(color);
        setNotification(message);
        setTimeout(() => setNotification(''), duration);
    };

    return (
        <div className="signup-form">
            <div className="title">Welcome! Enter User Details.</div>
            <form onSubmit={handleSubmit} className="input-container">
                <div className="input-row-signup">
                    <select required value={gender} onChange={e => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div className="input-row-signup">
                    <input
                        type="date"
                        required
                        value={dateOfBirth}
                        onChange={e => setDateOfBirth(e.target.value)}
                    />
                </div>
                <div className="input-row-signup">
                    <input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
                <back-button type="button" className="back-button" onClick={() => navigate('/login/user')}>Back</back-button>
            </form>
            {notification && <div className={`notification ${notificationColor === 'red' ? 'failure' : ''}`}>{notification}</div>}
        </div>
    );
}

export default SignUpForm;
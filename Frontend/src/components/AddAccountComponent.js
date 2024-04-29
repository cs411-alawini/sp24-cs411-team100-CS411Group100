import React, { useState } from 'react';
import '../styles/AddAccountComponent.css'; // Ensure CSS path is correct

function AddAccountComponent() {
    const [districtId, setDistrictId] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);

    const handleInputChange = (e) => {
        setDistrictId(e.target.value);
    };

    const handleSubmit = () => {
        if (!districtId) {
            setMessage("Error: District ID is required");
            setIsSuccess(false);
            return;
        }

        const token = localStorage.getItem("token"); // Retrieve token from local storage
        if (!token) {
            setMessage("Error: Authentication token not found");
            setIsSuccess(false);
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", `Bearer ${token}`);
        // Optional: Remove cookie if not needed or manage cookies differently
        // myHeaders.append("Cookie", "<your_cookie_here>");

        const urlencoded = new URLSearchParams();
        urlencoded.append("DistrictID", districtId);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow"
        };

        fetch("http://localhost:8000/api/account", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === "Account created successfully") {
                    setMessage("Account Created Successfully");
                    setIsSuccess(true);
                } else {
                    throw new Error('Failed to create account');
                }
            })
            .catch(error => {
                console.error(error);
                setMessage("Error: Could not create account");
                setIsSuccess(false);
            })
            .finally(() => {
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            });
    };

    return (
        <div className="input-container">
            <div className="input-row"> {/* Added this container for inline display */}
                <label htmlFor="districtId">Enter District ID for new account:</label>
                <input
                    type="text"
                    id="districtId"
                    className="district-input"
                    value={districtId}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleSubmit} className="submit-button">Create Account</button>
            {message && (
                <div className={`notification ${isSuccess ? '' : 'failure'}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default AddAccountComponent;
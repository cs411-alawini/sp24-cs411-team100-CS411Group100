import React, { useState, useEffect } from 'react';
import '../styles/AddAccountComponent.css'; // Ensure the path is correct

function AddAccountComponent() {
    const [districts, setDistricts] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", "connect.sid=s%3A3-_8ka7x-_gWr-_QuSk8fpOF5t70F2gg.Wn4BFiUiJe2ds371%2BrRPQmdbQqGoL5uEkBzY0CZG4a8");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8000/api/get/districts", requestOptions)
            .then(response => response.json())
            .then(result => setDistricts(result.districts))
            .catch(error => console.error("Failed to fetch districts", error));
    }, []);

    const handleDistrictChange = (e) => {
        setSelectedDistrictId(e.target.value);
    };

    const handleSubmit = () => {
        if (!selectedDistrictId) {
            setMessage("Error: District selection is required");
            setIsSuccess(false);
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Error: Authentication token not found");
            setIsSuccess(false);
            return;
        }

        const myHeaders = new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${token}`,
        });

        const urlencoded = new URLSearchParams();
        urlencoded.append("DistrictID", selectedDistrictId);

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
            <div className="input-row">
                <label htmlFor="districtSelect">Select District for new account:</label>
                <select
                    id="districtSelect"
                    className="district-input"
                    value={selectedDistrictId}
                    onChange={handleDistrictChange}
                >
                    <option value="">Please select a district</option>
                    {districts.map(district => (
                        <option key={district.DistrictID} value={district.DistrictID}>
                            {district.DistrictName}
                        </option>
                    ))}
                </select>
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
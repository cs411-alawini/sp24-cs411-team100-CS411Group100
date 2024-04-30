import React, { useState, useEffect } from 'react';
import '../styles/UserDetailsComponent.css';

function UpdateAccountComponent({ setShowUpdateAccount }) {
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [message, setMessage] = useState('');
    const [notificationColor, setNotificationColor] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const accountID = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');
    
        const headers = new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        });
    
        Promise.all([
            fetch(`http://localhost:8000/api/account/${accountID}`, { method: "GET", headers }),
            fetch("http://localhost:8000/api/get/districts", { method: "GET", headers })
        ])
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(([accountData, districtData]) => {
            console.log("Account Data:", accountData); // Log account data
            console.log("Districts Data:", districtData); // Log districts data
            setDistricts(districtData.districts);
            const currentDistrict = districtData.districts.find(d => d.DistrictID === accountData.account.DistrictID)?.DistrictName;
            console.log("Current District:", currentDistrict); // Log the computed current district
            setSelectedDistrict(currentDistrict);
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        });
    }, []);
    

    const handleUpdate = (e) => {
        e.preventDefault();
        const headers = new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        });

        const districtID = districts.find(d => d.DistrictName === selectedDistrict)?.DistrictID;

        const urlencoded = new URLSearchParams();
        urlencoded.append("DistrictID", districtID);

        const requestOptions = {
            method: "PUT",
            headers: headers,
            body: urlencoded,
            redirect: "follow"
        };

        fetch(`http://localhost:8000/api/account/${localStorage.getItem('accountId')}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setMessage("Account updated successfully");
                setNotificationColor("green");
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(error => {
                console.error('Error updating account:', error);
                setMessage("Error updating account");
                setNotificationColor("red");
                setTimeout(() => setMessage(''), 3000);
            });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleUpdate} className="user-details-form">
            <div className="user-detail-field">
                <label>District</label>
                <select
                    value={selectedDistrict}
                    onChange={e => setSelectedDistrict(e.target.value)}
                    className="user-detail-input"
                >
                    {districts.map((district) => (
                        <option key={district.DistrictID} value={district.DistrictName}>
                            {district.DistrictName}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="save-button">Update Account</button>
            {message && <div className={`message ${notificationColor}`}>{message}</div>}
        </form>
    );
}

export default UpdateAccountComponent;
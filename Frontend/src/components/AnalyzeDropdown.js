import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

function AnalyzeDropdown({ accountId }) {
    const [data, setData] = useState({
        categoryData: [],
        monthlyAverageData: []
    });

    useEffect(() => {
        // Replace this URL with your actual API endpoint
        fetch(`http://localhost:8000/api/transaction/2080?page=1&limit=20000`)
            .then(response => response.json())
            .then(data => {
                setData({
                    categoryData: data.categoryData,
                    monthlyAverageData: data.monthlyAverageData
                });
            })
            .catch(error => console.error('Error fetching analysis data:', error));
    }, [accountId]);

    return (
        <div className="analyze-dropdown">
            <PieChart width={400} height={400}>
                <Pie dataKey="value" isAnimationActive={false} data={data.categoryData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                <Tooltip />
            </PieChart>
            <BarChart width={500} height={300} data={data.monthlyAverageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
        </div>
    );
}

export default AnalyzeDropdown;

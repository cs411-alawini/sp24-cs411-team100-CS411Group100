import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import '../styles/AnalyzeDropdown.css';  // Ensure you have some basic styling for the chart

function AnalyzeDropdown({ accountId }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': `Bearer ${token}`
        });

        fetch(`http://localhost:8000/api/transaction/${accountId}`, {
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.transactionSummary) {
                const processedData = processChartData(data.transactionSummary);
                setData(processedData);
            } else {
                throw new Error('Transaction data is missing in the response');
            }
        })
        .catch(err => {
            setError(err.message);
            console.error('Error:', err);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [accountId]);

    const processChartData = (transactions) => {
        const totals = transactions.reduce((acc, { TransactionType, Amount }) => {
            const amount = parseFloat(Amount);
            if (!acc[TransactionType]) {
                acc[TransactionType] = 0;
            }
            acc[TransactionType] += amount;
            return acc;
        }, {});

        return Object.keys(totals).map(type => ({ name: type, value: totals[type] }));
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0'];

    return (
        <div className="analyze-dropdown">
            {loading ? <div>Loading...</div> :
                error ? <div className="error">{error}</div> :
                <PieChart width={400} height={400}>
                    <Pie data={data} cx={200} cy={200} outerRadius={100} label>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            }
        </div>
    );
}

export default AnalyzeDropdown;

import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import '../styles/DistrictInsights.css';
import SearchBar from "./CSearch/SearchBar";
import { EmbedLiveboard } from "./EmbedLiveboard"; // Import EmbedLiveboard component
import { Search } from "./Search"; // Import Search component

function DistrictInsights() {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/get/districts")
      .then(res => res.json())
      .then(data => {
        console.log("Districts fetched", data.districts);
        setDistricts(data.districts || []);
      })
      .catch(err => {
        console.error('Error fetching districts:', err);
        setError('Failed to fetch districts');
      });
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      setLoading(true);
      const token = localStorage.getItem('token');
      fetch(`http://localhost:8000/api/employee/insight?DistrictId=${selectedDistrict}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        console.log("Insights fetched", data);
        setInsights(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching insights:', err);
        setError('Failed to fetch district insights');
        setLoading(false);
      });
    }
  }, [selectedDistrict]);

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <SearchBar
          searchCategory={['User', 'Account', 'District', 'Loan']}
          setSelectedOption={() => { }}
          placeholder={"Search value"}
        />
    <div className="district-insights">
      <h1>District Insights</h1>
      <select onChange={handleDistrictChange} value={selectedDistrict} disabled={loading}>
        <option value="">Select a District</option>
        {districts.map(district => (
          <option key={district.DistrictID} value={district.DistrictID}>
            {district.DistrictName}
          </option>
        ))}
      </select>
      {insights && insights.insight && (
        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={insights.insight}
              dataKey="TotalAmount"
              nameKey="TransactionType"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {insights.insight.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
      <Search /> {/* ThoughtSpot Search component */}
      <EmbedLiveboard /> {/* ThoughtSpot Liveboard component */}
      {error && <p className="error">{error}</p>}
    </div>
    </div>
  );
}

export default DistrictInsights;

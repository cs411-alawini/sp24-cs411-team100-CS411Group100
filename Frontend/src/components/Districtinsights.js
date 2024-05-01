import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import '../styles/DistrictInsights.css';
import SearchBar from "./CSearch/SearchBar";
import { EmbedLiveboard } from "./EmbedLiveboard"; // Import EmbedLiveboard component
import { Search } from "./Search"; // Import Search component

function DistrictInsights() {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [insights, setInsights] = useState(null);
  const [creditScoreChart, setCreditScoreChart] = useState(null);
  const [insightChart, setInsightChart] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/get/districts")
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
      if (creditScoreChart) {
        creditScoreChart.destroy();
      }
      if (insightChart) {
        insightChart.destroy();
      }
      setLoading(true);
      const token = localStorage.getItem('token');
      fetch(`/api/employee/insight?DistrictId=${selectedDistrict}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        console.log("Insights fetched", data);
        setInsights(data);
        if (data) {

          // Credit Score Chart
          const creditScoreLabels = data.creditScore.map((entry) => entry.Gender);
          const creditScoreData = data.creditScore.map((entry) => entry.AverageCreditScore);
          console.log(creditScoreLabels, creditScoreData)
    
          const creditScoreCtx = document.getElementById('creditScoreChart');
          const newCreditScoreChart = new Chart(creditScoreCtx, {
            type: 'bar',
            data: {
              labels: creditScoreLabels,
              datasets: [{
                label: 'Average Credit Score',
                data: creditScoreData,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
          setCreditScoreChart(newCreditScoreChart);
    
          // Insight Chart
          const insightLabels = data.insight.map((entry) => entry.TransactionType);
          const insightData = data.insight.map((entry) => entry.TotalAmount);
    
          const insightCtx = document.getElementById('insightChart');
          const newInsightChart = new Chart(insightCtx, {
            type: 'bar',
            data: {
              labels: insightLabels,
              datasets: [{
                label: 'Total Amount',
                data: insightData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
          setInsightChart(newInsightChart);
        }
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
        <div>
          <h2>Credit Score</h2>
      <canvas id="creditScoreChart" width="400" height="200"></canvas>

      <h2>Insight</h2>
      <canvas id="insightChart" width="400" height="200"></canvas>
        </div>
      <Search /> {/* ThoughtSpot Search component */}
      <EmbedLiveboard /> {/* ThoughtSpot Liveboard component */}
      {error && <p className="error">{error}</p>}
    </div>
    </div>
  );
}

export default DistrictInsights;

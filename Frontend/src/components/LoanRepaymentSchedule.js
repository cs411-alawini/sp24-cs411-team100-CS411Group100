import React, { useEffect, useState } from 'react';
import '../styles/LoanRepaymentSchedule.css';  // Make sure this path is correct

function LoanRepaymentSchedule({ loanId }) {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const accountID = localStorage.getItem('accountId');
    const myHeaders = new Headers({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    });

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8000/api/loan/${accountID}/repaymentSchedule/${loanId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setSchedule(result.repaymentSchedule);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching repayment schedule:', error);
        setLoading(false);
      });

  }, [loanId]);

  if (loading) return <div>Loading...</div>;

  if (!schedule.length) return <div>No Repayment Data</div>;

  return (
    <div className="repayment-schedule">
      <table>
        <thead>
          <tr>
            <th>Loan Month</th>
            <th>Payment (USD)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index} className={item.PaymentStatus === "Paid" ? "paid" : "not-paid"}>
              <td>{new Date(item.LoanMonth).toLocaleDateString()}</td>
              <td>{item.Payment}</td>
              <td>{item.PaymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanRepaymentSchedule;
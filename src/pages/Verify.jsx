import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Verify = () => {
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/verify/history');
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: phone })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      setResult(data);
      setPhone('');
      fetchHistory(); // refresh history after submission
    } catch (err) {
      setError(err.message);
    }
  };

  const chartData = {
    labels: ['Valid', 'Invalid'],
    datasets: [{
      label: 'Verification Results',
      data: [
        history.filter(item => item.valid).length,
        history.filter(item => !item.valid).length
      ],
      backgroundColor: ['green', 'red']
    }]
  };

  return (
    <div>
      <h2>📞 Phone Number Verification</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="+1234567890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Verify</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '1rem', backgroundColor: '#f2f2f2', padding: '1rem' }}>
          <h3>Result:</h3>
          <p><strong>Number:</strong> {result.number}</p>
          <p><strong>Valid:</strong> {result.valid ? 'Yes' : 'No'}</p>
          <p><strong>Country:</strong> {result.country_name}</p>
          <p><strong>Carrier:</strong> {result.carrier}</p>
          <p><strong>Line Type:</strong> {result.line_type}</p>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>📊 Recent Results Chart</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Verify;

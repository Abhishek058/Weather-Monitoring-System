import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Visualization = ({ city }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 7);

        const dateRange = [];
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          dateRange.push(new Date(d).toISOString().split('T')[0]);
        }

        const summaries = await Promise.all(
          dateRange.map((date) =>
            axios.get(`http://localhost:5000/api/summary/${city}/${date}`)
          )
        );

        const data = summaries.map((response) => response.data).filter(Boolean);

        setChartData({
          labels: data.map((d) => new Date(d.date).toLocaleDateString()),
          datasets: [
            {
              label: 'Average Temperature',
              data: data.map((d) => d.avgTemp),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'Max Temperature',
              data: data.map((d) => d.maxTemp),
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
            {
              label: 'Min Temperature',
              data: data.map((d) => d.minTemp),
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
            },
          ],
        });
        setError(null);
      } catch (error) {
        console.error('Error fetching historical data:', error);
        setError('Failed to fetch historical data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [city]);

  if (loading) {
    return <div>Loading visualization...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!chartData) {
    return <div>No data available for visualization.</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Temperature Trends for ${city} (Last 7 Days)`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
    },
  };

  return (
    <div className="visualization">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Visualization;
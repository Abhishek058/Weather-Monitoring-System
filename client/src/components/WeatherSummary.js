import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherSummary = ({ city }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split("T")[0];
        const response = await axios.get(
          `http://localhost:5000/api/summary/${city}/${today}`
        );
        setSummary(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching weather summary:", error);
        setError("Failed to fetch weather summary. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [city]);

  if (loading) {
    return <div>Loading summary...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!summary) {
    return <div>No summary available for today.</div>;
  }

  return (
    <div className="weather-summary">
      <h3>Daily Summary for {city}</h3>
      <p>Date: {new Date(summary.date).toLocaleDateString()}</p>
      <p>Average Temperature: {summary.avgTemp}°C</p>
      <p>Max Temperature: {summary.maxTemp}°C</p>
      <p>Min Temperature: {summary.minTemp}°C</p>
      <p>Dominant Weather: {summary.dominantWeather}</p>
    </div>
  );
};

export default WeatherSummary;

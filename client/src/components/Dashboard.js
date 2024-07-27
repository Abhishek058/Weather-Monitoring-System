import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherSummary from "./WeatherSummary";
import AlertConfig from "./AlertConfig";
import Visualization from "./Visualization";

const Dashboard = () => {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [alertThreshold, setAlertThreshold] = useState(35);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/current");
        setCurrentWeather(response.data);
        if (response.data.length > 0 && !selectedCity) {
          setSelectedCity(response.data[0].city);
        }
      } catch (error) {
        console.error("Error fetching current weather:", error);
      }
    };

    fetchCurrentWeather();
    const interval = setInterval(fetchCurrentWeather, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  const handleAlertThresholdChange = (newThreshold) => {
    setAlertThreshold(newThreshold);
  };

  return (
    <div className="dashboard">
      <h2>Current Weather</h2>
      <div className="current-weather">
        {currentWeather.map((data) => (
          <div
            key={data.city}
            className={`weather-card ${
              data.city === selectedCity ? "selected" : ""
            }`}
            onClick={() => setSelectedCity(data.city)}
          >
            <h3>{data.city}</h3>
            <p>Temperature: {data.temp.toFixed(1)}°C</p>
            <p>Feels like: {data.feels_like.toFixed(1)}°C</p>
            <p>Condition: {data.main}</p>
            {data.temp > alertThreshold && (
              <p className="alert">Temperature above threshold!</p>
            )}
          </div>
        ))}
      </div>
      {selectedCity && (
        <>
          <WeatherSummary city={selectedCity} />
          <AlertConfig
            threshold={alertThreshold}
            onThresholdChange={handleAlertThresholdChange}
          />
          <Visualization city={selectedCity} />
        </>
      )}
    </div>
  );
};

export function checkAlertThreshold(temperature, threshold) {
  return temperature > threshold;
}

export default Dashboard;

const axios = require('axios');
const config = require('../config');
const WeatherData = require('../models/WeatherData');

const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: config.openWeatherMapApiKey,
        units: 'metric',
      },
    });

    const { main, weather, dt } = response.data;
    return new WeatherData({
      city,
      main: weather[0].main,
      temp: main.temp,
      feels_like: main.feels_like,
      dt: new Date(dt * 1000),
    });
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    return null;
  }
};

const updateWeatherData = async () => {
  for (const city of config.cities) {
    const weatherData = await fetchWeatherData(city);
    if (weatherData) {
      await weatherData.save();
      console.log(`Weather data updated for ${city}`);
    }
  }
};

const getDailySummary = async (city, date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const weatherData = await WeatherData.find({
    city,
    dt: { $gte: startOfDay, $lte: endOfDay },
  });

  if (weatherData.length === 0) {
    return null;
  }

  const temperatures = weatherData.map((data) => data.temp);
  const weatherConditions = weatherData.map((data) => data.main);

  const avgTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
  const maxTemp = Math.max(...temperatures);
  const minTemp = Math.min(...temperatures);
  const dominantWeather = getDominantWeather(weatherConditions);

  return {
    city,
    date: startOfDay,
    avgTemp: avgTemp.toFixed(2),
    maxTemp: maxTemp.toFixed(2),
    minTemp: minTemp.toFixed(2),
    dominantWeather,
  };
};

const getDominantWeather = (conditions) => {
  const counts = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
};

module.exports = {
  updateWeatherData,
  getDailySummary,
};
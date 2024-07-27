const express = require('express');
const WeatherData = require('../models/WeatherData');
const { getDailySummary } = require('../services/weatherService');
const config = require('../config');

const router = express.Router();

router.get('/current', async (req, res) => {
  try {
    const currentWeather = await WeatherData.find().sort({ dt: -1 }).limit(config.cities.length);
    res.json(currentWeather);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current weather data' });
  }
});

router.get('/summary/:city/:date', async (req, res) => {
  try {
    const { city, date } = req.params;
    const summary = await getDailySummary(city, new Date(date));
    if (summary) {
      res.json(summary);
    } else {
      res.status(404).json({ message: 'No data found for the specified date and city' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching daily summary' });
  }
});

module.exports = router;
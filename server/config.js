require('dotenv').config();

module.exports = {
  mongodbUri: process.env.MONGODB_URI,
  openWeatherMapApiKey: process.env.OPENWEATHERMAP_API_KEY,
  port: process.env.PORT || 5000,
  cities: ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'],
  updateInterval: 5 * 60 * 1000, // 5 minutes
};
const { updateWeatherData } = require('../services/weatherService');
const WeatherData = require('../models/WeatherData');

jest.mock('../models/WeatherData');

test('Weather data is retrieved and saved for all cities', async () => {
  await updateWeatherData();
  expect(WeatherData.prototype.save).toHaveBeenCalledTimes(6); // Assuming 6 cities
});
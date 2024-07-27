const axios = require('axios');
const config = require('../config');

test('Server connects to OpenWeatherMap API', async () => {
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
    params: {
      q: 'London',
      appid: config.openWeatherMapApiKey,
      units: 'metric',
    },
  });
  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty('main');
  expect(response.data).toHaveProperty('weather');
});
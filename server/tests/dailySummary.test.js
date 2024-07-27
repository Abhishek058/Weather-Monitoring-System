const { getDailySummary } = require('../services/weatherService');
const WeatherData = require('../models/WeatherData');

jest.mock('../models/WeatherData');

test('Daily summary calculation', async () => {
  const mockData = [
    { city: 'TestCity', temp: 20, main: 'Clear', dt: new Date('2023-07-27T00:00:00Z') },
    { city: 'TestCity', temp: 25, main: 'Clear', dt: new Date('2023-07-27T06:00:00Z') },
    { city: 'TestCity', temp: 30, main: 'Clouds', dt: new Date('2023-07-27T12:00:00Z') },
    { city: 'TestCity', temp: 22, main: 'Clear', dt: new Date('2023-07-27T18:00:00Z') },
  ];

  WeatherData.find.mockResolvedValue(mockData);

  const summary = await getDailySummary('TestCity', new Date('2023-07-27'));

  expect(summary).toEqual({
    city: 'TestCity',
    date: expect.any(Date),
    avgTemp: '24.25',
    maxTemp: '30.00',
    minTemp: '20.00',
    dominantWeather: 'Clear',
  });
});
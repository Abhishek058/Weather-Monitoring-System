const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const config = require('./config');
const apiRoutes = require('./routes/api');
const { updateWeatherData } = require('./services/weatherService');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', apiRoutes);

cron.schedule('*/5 * * * *', updateWeatherData);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
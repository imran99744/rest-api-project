require('dotenv').config();
const express = require('express');
const axios = require('axios');
const dayjs = require('dayjs');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || '1.0.0';
const API_KEY = process.env.OWM_API_KEY;

// /api/hello: returns hostname, datetime, version, and weather data from OpenWeatherMap
app.get('/api/hello', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ 
      error: 'Missing OpenWeatherMap API key',
      hostname: os.hostname(),
      datetime: dayjs().format('YYMMDDHHmm'),
      version: VERSION
    });
  }

  try {
    const weatherResp = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Dhaka&units=metric&appid=${API_KEY}`,
      { timeout: 5000 }  // Add timeout
    );
    const temp = weatherResp.data.main.temp;
    return res.json({
      hostname: os.hostname(),
      datetime: dayjs().format('YYMMDDHHmm'),
      version: VERSION,
      weather: {
        dhaka: {
          temperature: temp.toString(),
          temp_unit: 'c'
        }
      }
    });
  } catch (error) {
    console.error('Weather API Error:', error.message);
    return res.json({
      hostname: os.hostname(),
      datetime: dayjs().format('YYMMDDHHmm'),
      version: VERSION,
      error: 'Weather data unavailable',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// /api/health: verifies API health and third-party reachability
app.get('/api/health', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ status: 'error', error: 'Missing API key' });
  }

  try {
    await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Dhaka&units=metric&appid=${API_KEY}`
    );
    return res.json({ status: 'ok' });
  } catch (error) {
    return res.status(503).json({ status: 'error', error: '3rd-party API unreachable' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
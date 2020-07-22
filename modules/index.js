const express = require('express');
const temlData = require('../temp.json');
const getWeather = require('./model/getWeather');
const searchPlaylist = require('./model/searchPlaylist');
const callRefreshToken = require('./model/callRefreshToken');

const router = new express.Router();

router.get('/', (req, res) => {
  res.send('AIZETIFY API');
});

router.get('/bangkok', (req, res) => {
  res.json(temlData);
});

router.get('/getWeather', async (req, res) => {
  let result = { data: {}, status: 200 };

  const { q: keyword } = req.query;
  if (keyword) {
    const response = await getWeather(keyword);
    result = { ...result, ...response };
  }

  res.json(result);
});

router.post('/refreshToken', async (req, res) => {
  let result = { data: {}, status: 200 };

  const { refresh_token: refreshToken } = req.body;
  if (refreshToken) {
    const response = await callRefreshToken(refreshToken);
    result = { ...result, ...response };
  }
  res.json(result);
});

router.post('/searchPlaylist', async (req, res) => {
  let result = { data: {}, status: 200 };
  const { token, keyword } = req.body;

  if (token && keyword) {
    const response = await searchPlaylist(token, keyword);
    result = { ...result, ...response };
  }

  res.json(result);
});

router.post('/searchPlaylistByWeather', async (req, res) => {
  let result = { data: {}, status: 200 };
  const { token, city } = req.body;

  if (token && city) {
    const {
      data: { weather }
    } = await getWeather(city);
    const currentWeather = weather.length > 0 ? weather[0].main : false;

    const response = await searchPlaylist(token, currentWeather);
    response.data = { ...response.data, weather: currentWeather };

    result = { ...result, ...response };
  }
  res.json(result);
});

module.exports = router;

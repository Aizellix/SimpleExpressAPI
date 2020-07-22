const express = require('express');
const { basicauth } = require('./helper');
const apiModule = require('./modules');
const bodyParser = require('body-parser');
const getToken = require('./modules/model/getToken');

const server = express();

const env = process.env;

const scopes = env.SPOTIFY_USER_SCOPES;
const clientId = env.SPOTIFY_CLIENT_ID;
const redirectUri = env.SPOTIFY_LOGIN_REDIRECT_URI;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.send('API');
});

server.get('/login', (req, res) => {
  const authorizeURL = `${env.AUTHORIZE_API_URL}?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;
  res.redirect(authorizeURL);
});

server.get('/login/callback', async (req, res) => {
  const { code } = req.query;
  let result = {};
  if (code) {
    const response = await getToken(code);
    result = { ...result, ...response };
  }
  res.json(result);
});

server.use('/api', basicauth, apiModule);

server.listen(3000, () => {
  console.log('Start server at port 3000.');
});

const axios = require('axios');
const { base64Encode } = require('../../helper');
const qs = require('qs');

const env = process.env;

const clientId = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;

module.exports = callRefreshToken = async refreshToken => {
  let basicToken = `${clientId}:${clientSecret}`;
  basicToken = base64Encode(basicToken);
  const formData = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  };
  const apiCaller = axios.create({
    baseURL: env.TOKEN_API_URL,
    headers: {
      Authorization: `Basic ${basicToken}`,
      'content-type': 'application/x-www-form-urlencoded'
    },
    timeout: 20000000
  });
  try {
    const { data, status } = await apiCaller.post('/', qs.stringify(formData));
    return { data, status };
  } catch (error) {
    return { data: {}, status: 200 };
  }
};

const axios = require('axios');
const env = process.env;

module.exports = getWeather = async keyword => {
  try {
    const { data, status } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=${env.OPENWEATHER_APP_ID}&lang=th`);
    return { data, status };
  } catch (error) {
    return { data: {}, status: 200 };
  }
};

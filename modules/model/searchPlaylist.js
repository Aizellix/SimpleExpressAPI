const axios = require('axios');
const env = process.env;

module.exports = searchPlaylist = async (token, keyword) => {
  const apiCaller = axios.create({
    baseURL: env.SEARCH_API_URL,
    headers: { Authorization: `Bearer ${token}` },
    timeout: 20000000
  });
  try {
    const { data, status } = await apiCaller.get(`?q=${keyword}&type=playlist`);
    return { data, status };
  } catch (error) {
    return { data: {}, status: 200 };
  }
};

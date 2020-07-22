import axios from 'axios';

const apiCaller = axios.create({
  baseURL: publicRuntimeConfig.baseUrl,
  auth: {
    username: publicRuntimeConfig.baseAuth.username,
    password: publicRuntimeConfig.baseAuth.password
  },
  timeout: 20000000
});

export default apiCaller;

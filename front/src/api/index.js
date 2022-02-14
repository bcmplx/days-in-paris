import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://sinbad-days-in-paris.herokuapp.com',
  baseURL: 'http://localhost:3000',
  timeout: 1500000,
});

export default api;
// http://ec2-54-86-41-164.compute-1.amazonaws.com

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localtips.herokuapp.com',
});

export default api;

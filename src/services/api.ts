import axios from 'axios';

const api = axios.create({
  // Teste na API local
  baseURL: 'http://localhost:3333',
  // Conecta na API do Heroku
  //baseURL: 'https://localtips.herokuapp.com',
});

export default api;

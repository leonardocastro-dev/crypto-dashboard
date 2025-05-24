import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.coinpaprika.com/v1/'
});

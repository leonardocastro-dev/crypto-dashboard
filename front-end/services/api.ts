import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://crypto-dashboard-ylhj.onrender.com/api'
});
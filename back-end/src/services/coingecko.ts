import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getGlobalData = async () => {
  const { data } = await axios.get(`${BASE_URL}/global`);
  return data;
};

export const getMarketChartByCoin = async (coinId: string) => {
  const { data } = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: 1
    }
  });
  return data;
};

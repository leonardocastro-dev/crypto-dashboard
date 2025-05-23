import express from 'express';
import { getMarketChartByCoin, getGlobalData } from '../services/coingecko';

const router = express.Router();

router.get('/global', async (req, res) => {
  try {
    const data = await getGlobalData();
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching global data:', error.message, error.response?.data);
    res.status(500).json({ error: 'Failed to fetch global data' });
  }
});

router.get('/:coinId/market_chart', async (req, res) => {
  const { coinId } = req.params;

  try {
    const data = await getMarketChartByCoin(coinId);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching market chart data:', error.message, error.response?.data);
    res.status(500).json({ error: 'Failed to fetch market chart data' });
  }
});

export default router;

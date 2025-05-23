import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/api/market-cap', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/global/market_cap_chart', {
      params: {
        vs_currency: 'usd',
        days: 1,
      },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching market cap data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';
import coingeckoRoutes from './routes/coingecko';

const app = express();
app.use(cors());

app.use('/api', coingeckoRoutes);

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});

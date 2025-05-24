import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../services/api';
import type { CoinTicker } from '../../../../types';

export interface CryptoDominance {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  dominance: number;
}

export const useTopMarketDominance = () => {
  return useQuery<CryptoDominance[]>({
    queryKey: ['top-market-dominance'],
    queryFn: async () => {
      const [globalRes, tickersRes] = await Promise.all([
        api.get('/global'),
        api.get('/tickers'),
      ]);

      const globalMarketCap = globalRes.data.market_cap_usd;

      const sortedTickers = tickersRes.data
        .filter((t: CoinTicker) => t.rank && t.quotes?.USD?.market_cap)
        .sort(
          (a: CoinTicker, b: CoinTicker) =>
            b.quotes.USD.market_cap - a.quotes.USD.market_cap
        )
        .slice(0, 5);

      return sortedTickers.map((t: CoinTicker) => {
        const marketCap = t.quotes.USD.market_cap;
        const dominance = (marketCap / globalMarketCap) * 100;

        return {
          id: t.id,
          name: t.name,
          symbol: t.symbol,
          image: `https://coinpaprika.com/coin/${t.id}/logo.png`,
          price: t.quotes.USD.price,
          priceChange24h: t.quotes.USD.percent_change_24h,
          volume24h: t.quotes.USD.volume_24h,
          dominance: dominance,
        };
      });
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

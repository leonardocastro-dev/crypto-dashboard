import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../services/api';

export const useMarketCapChange = () => {
  return useQuery({
    queryKey: ['market-cap-change'],
    queryFn: async () => {
      const { data } = await api.get('/global/market_cap_chart', {
        params: {
          vs_currency: 'usd',
          days: 1,
        },
      });

      const chart = data.market_cap_chart;
      const first = chart[0][1];
      const last = chart[chart.length - 1][1];

      const change = ((last - first) / first) * 100;

      return {
        current: last,
        change,
        isPositive: change >= 0,
      };
    },
  });
};

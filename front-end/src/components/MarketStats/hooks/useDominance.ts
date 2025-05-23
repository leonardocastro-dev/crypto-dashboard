import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../services/api';

export const useBTCDominance = () => {
  return useQuery({
    queryKey: ['btc-dominance'],
    queryFn: async () => {
      const { data } = await api.get('/global');
      return data.data.market_cap_percentage.btc;
    },
  });
};

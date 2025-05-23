import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../services/api';

export const useMarketDataChange = () => {
  return useQuery({
    queryKey: ['market-cap-volume-change'],
    queryFn: async () => {
      const { data } = await api.get('/coins/bitcoin/market_chart', {
        params: {
          vs_currency: 'usd',
          days: 1,
        },
      });

      // Market cap data
      const marketCapChart = data.market_caps;
      const firstMarketCap = marketCapChart[0][1];
      const lastMarketCap = marketCapChart[marketCapChart.length - 1][1];
      const marketCapChange = ((lastMarketCap - firstMarketCap) / firstMarketCap) * 100;

      // Volume data
      const volumeChart = data.total_volumes;
      const firstVolume = volumeChart[0][1];
      const lastVolume = volumeChart[volumeChart.length - 1][1];
      const volumeChange = ((lastVolume - firstVolume) / firstVolume) * 100;

      return {
        marketCap: lastMarketCap,
        marketCapChange,
        isMarketCapUp: marketCapChange >= 0,

        volume: lastVolume,
        volumeChange,
        isVolumeUp: volumeChange >= 0,
      };
    },
  });
};

import { useQuery } from '@tanstack/react-query'
import { api } from '../../../services/api'

export const useMarketDataChange = () => {
  return useQuery({
    queryKey: ['market-data-change'],
    queryFn: async () => {
      const globalRes = await api.get('/global')
      const global = globalRes.data

      const marketCapTotal = global.market_cap_usd
      const marketCapATH = global.market_cap_ath_value
      const marketCapATHDate = global.market_cap_ath_date

      const marketCapChangePercent = global.market_cap_change_24h

      const athChangePercent = (marketCapTotal / marketCapATH) * 100 - 100

      return {
        // Market Cap
        marketCap: marketCapTotal,
        marketCapChange: marketCapChangePercent,
        isMarketCapUp: marketCapChangePercent >= 0,

        // Volume
        volume: global.volume_24h_usd,
        volumeChange: global.volume_24h_change_24h,
        isVolumeUp: global.volume_24h_change_24h >= 0,

        // Market Cap ATH
        marketCapATH,
        marketCapATHDate,
        athChangePercent,
        isATHUp: athChangePercent >= 0
      }
    },
    refetchOnWindowFocus: false,
    retry: false
  })
}

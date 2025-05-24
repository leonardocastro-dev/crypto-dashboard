import './styles.scss'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { useTopMarketDominance } from './hooks/useTopMarketDominance '
import Skeleton from '../Skeleton'

interface Crypto {
  id: string
  name: string
  symbol: string
  image: string
  price: number
  priceChange24h: number
  volume24h: number
  dominance: number
}

const CryptoList = () => {
  const { data: cryptos, isLoading } = useTopMarketDominance()

  return (
    <div className="glass-card container" style={{ marginBottom: 0 }}>
      <h2>Top Cryptocurrencies</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton height="32px" width="200px" />
                    </td>
                    <td>
                      <Skeleton height="32px" width="200px" />
                    </td>
                    <td>
                      <Skeleton height="32px" width="200px" />
                    </td>
                    <td>
                      <Skeleton height="32px" width="200px" />
                    </td>
                  </tr>
                ))
              : cryptos?.map((crypto: Crypto) => (
                  <tr key={crypto.symbol}>
                    <td>
                      <div className="coin">
                        <img src={crypto.image} alt={crypto.name} />
                        <div>
                          <p className="coin-name">{crypto.name}</p>
                          <p className="coin-symbol">
                            {crypto.symbol.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      $
                      {crypto.price.toLocaleString(undefined, {
                        maximumFractionDigits: 0
                      })}
                    </td>
                    <td>
                      <span
                        className={
                          crypto.priceChange24h >= 0
                            ? 'text-success'
                            : 'text-danger'
                        }
                      >
                        {crypto.priceChange24h >= 0 ? (
                          <ArrowUpIcon style={{ width: 12, height: 12 }} />
                        ) : (
                          <ArrowDownIcon style={{ width: 12, height: 12 }} />
                        )}
                        {crypto.priceChange24h}%
                      </span>
                    </td>
                    <td>
                      $
                      {crypto.volume24h.toLocaleString(undefined, {
                        maximumFractionDigits: 0
                      })}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CryptoList

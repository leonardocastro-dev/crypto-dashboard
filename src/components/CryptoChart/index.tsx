import './styles.scss'
import TradingViewWidget from '../TradingViewWidget'

const CryptoChart = () => {
  return (
    <div className="glass-card container">
      <div className="container-title">
        <h2>Bitcoin Price</h2>
      </div>
      <div className="container-chart">
        <TradingViewWidget />
      </div>
    </div>
  )
}

export default CryptoChart

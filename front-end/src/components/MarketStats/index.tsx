import "./style.scss";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "lucide-react";
import { useMarketCapChange } from "./hooks/useMarketCapChange";

const MarketStats = () => {
  const { data: capChange, isLoading: loadingCap } = useMarketCapChange();

  if (loadingCap) return <div>Loading...</div>;

  const isMarketUp = capChange?.isPositive;
  const marketChangePercent = capChange?.change.toFixed(2);

  const formatCurrency = (num: number) =>
    num >= 1e12
      ? `$${(num / 1e12).toFixed(2)}T`
      : num >= 1e9
      ? `$${(num / 1e9).toFixed(2)}B`
      : `$${(num / 1e6).toFixed(2)}M`;

  return (
    <div className="market-stats">
      <div className="glass-card">
        <div>
          <h3>Market Cap</h3>
          <TrendingUpIcon style={{ width: 16, height: 16 }} className="text-success" />
        </div>
        <p>{formatCurrency(capChange?.current || 0)}</p>
        <span className={isMarketUp ? 'text-success' : 'text-danger'}>
          {isMarketUp ? (
            <ArrowUpIcon style={{ width: 16, height: 16 }} />
          ) : (
            <ArrowDownIcon style={{ width: 16, height: 16 }} />
          )}
          {marketChangePercent}%
        </span>
      </div>
      
      <div className="glass-card">
        <div>
          <h3>24h Volume</h3>
          <TrendingUpIcon style={{ width: 16, height: 16 }} className="text-success" />
        </div>
        <p>$84.2B</p>
        <span className="text-success">
          <ArrowUpIcon style={{ width: 16, height: 16 }} />
          5.1%
        </span>
      </div>
      
      <div className="glass-card">
        <div>
          <h3>BTC Dominance</h3>
          <TrendingUpIcon style={{ width: 16, height: 16 }} className="text-warning" />
        </div>
        <p>42.1%</p>
        <span className="text-warning">
          <ArrowDownIcon style={{ width: 16, height: 16 }} />
          0.8%
        </span>
      </div>
    </div>
  );
};

export default MarketStats;
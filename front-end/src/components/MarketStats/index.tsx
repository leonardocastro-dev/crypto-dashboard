import "./style.scss";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "lucide-react";
import { useMarketDataChange } from "./hooks/useMarketDataChange";
import { useBTCDominance } from "./hooks/useDominance";
import { useEffect, useRef, useState } from "react";

const MarketStats = () => {
  const { data: capChange, isLoading: loadingCap } = useMarketDataChange();
  const { data: btcDominance, isLoading: loadingDominance } = useBTCDominance();
  const prevDominanceRef = useRef<number | null>(null);
  const [dominanceChange, setDominanceChange] = useState<number | null>(null);
  const [isDominanceUp, setIsDominanceUp] = useState<boolean | null>(null);

  useEffect(() => {
    if (btcDominance !== undefined && btcDominance !== null) {
      if (prevDominanceRef.current !== null) {
        const change = ((btcDominance - prevDominanceRef.current) / prevDominanceRef.current) * 100;
        setDominanceChange(change);
        setIsDominanceUp(change >= 0);
      }
      prevDominanceRef.current = btcDominance;
    }
  }, [btcDominance]);


  if (loadingCap || loadingDominance) return <div>Loading...</div>;

  const isMarketUp = capChange?.isMarketCapUp;
  const marketChangePercent = capChange?.marketCapChange.toFixed(2);
  const isVolumeUp = capChange?.isVolumeUp;
  const volumeChangePercent = capChange?.volumeChange.toFixed(2);

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
        <p>{formatCurrency(capChange?.marketCap || 0)}</p>
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
        <p>{formatCurrency(capChange?.volume || 0)}</p>
        <span className={isVolumeUp ? 'text-success' : 'text-danger'}>
          {isVolumeUp ? (
            <ArrowUpIcon style={{ width: 16, height: 16 }} />
          ) : (
            <ArrowDownIcon style={{ width: 16, height: 16 }} />
          )}
          {volumeChangePercent}%
        </span>
      </div>
      
      <div className="glass-card">
        <div>
          <h3>BTC Dominance</h3>
          <TrendingUpIcon style={{ width: 16, height: 16 }} className="text-warning" />
        </div>
        <p>{btcDominance?.toFixed(2)}%</p>
        <span className={isDominanceUp ? 'text-success' : 'text-danger'}>
          {isDominanceUp ? (
            <ArrowUpIcon style={{ width: 16, height: 16 }} />
          ) : (
            <ArrowDownIcon style={{ width: 16, height: 16 }} />
          )}
          {dominanceChange?.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default MarketStats;
import "./styles.scss";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "lucide-react";
import { useMarketDataChange } from "./hooks/useMarketDataChange";
import Skeleton from "../Skeleton";

const MarketStats = () => {
  const { data, isLoading } = useMarketDataChange();

  if (isLoading) return <Skeleton />;

  const formatCurrency = (num: number) =>
    num >= 1e12
      ? `$${(num / 1e12).toFixed(2)}T`
      : num >= 1e9
      ? `$${(num / 1e9).toFixed(2)}B`
      : `$${(num / 1e6).toFixed(2)}M`;

  return (
    <div className="market-stats">
      {/* Market Cap */}
      {isLoading ? (
        <Skeleton height="136px" />
      ) : (
        <div className="glass-card">
        <div>
          <h3>Market Cap</h3>
          <TrendingUpIcon
            style={{ width: 16, height: 16 }}
            className={data?.isMarketCapUp ? "text-success" : "text-danger"}
          />
        </div>
        <p>{formatCurrency(data?.marketCap || 0)}</p>
        <span
          className={data?.isMarketCapUp ? "text-success" : "text-danger"}
        >
          {data?.isMarketCapUp ? (
            <ArrowUpIcon style={{ width: 16, height: 16 }} />
          ) : (
            <ArrowDownIcon style={{ width: 16, height: 16 }} />
          )}
          {data?.marketCapChange.toFixed(2)}%
          </span>
        </div>
      )}

      {/* 24h Volume */}
      {isLoading ? (
        <Skeleton height="136px" />
      ) : (
        <div className="glass-card">
        <div>
          <h3>24h Volume</h3>
          <TrendingUpIcon
            style={{ width: 16, height: 16 }}
            className={data?.isVolumeUp ? "text-success" : "text-danger"}
          />
        </div>
        <p>{formatCurrency(data?.volume || 0)}</p>
        <span className={data?.isVolumeUp ? "text-success" : "text-danger"}>
          {data?.isVolumeUp ? (
            <ArrowUpIcon style={{ width: 16, height: 16 }} />
          ) : (
            <ArrowDownIcon style={{ width: 16, height: 16 }} />
          )}
          {data?.volumeChange.toFixed(2)}%
        </span>
        </div>
      )}

      {/* Market Cap ATH */}
      {isLoading ? (
        <Skeleton height="136px" />
      ) : (
        <div className="glass-card">
          <div>
          <h3>Market Cap ATH</h3>
          <TrendingUpIcon
            style={{ width: 16, height: 16 }}
            className={data?.isATHUp ? "text-success" : "text-danger"}
          />
        </div>
        <p>{formatCurrency(data?.marketCapATH || 0)}</p>
        <span className={data?.isATHUp ? "text-success" : "text-danger"}>
          {data?.isATHUp ? (
            <ArrowUpIcon style={{ width: 16, height: 16 }} />
          ) : (
            <ArrowDownIcon style={{ width: 16, height: 16 }} />
          )}
          {data?.athChangePercent.toFixed(2)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default MarketStats;

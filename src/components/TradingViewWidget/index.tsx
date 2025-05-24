import { useEffect, useRef, memo } from 'react'

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentContainer = container.current
    if (!currentContainer) return
    currentContainer.innerHTML = ''

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true

    const config = {
      autosize: true,
      symbol: 'BITSTAMP:BTCUSD',
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      allow_symbol_change: true,
      support_host: 'https://www.tradingview.com'
    }

    script.textContent = JSON.stringify(config)
    currentContainer.appendChild(script)

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = ''
      }
    }
  }, [])

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: '100%', width: '100%' }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: 'calc(100% - 32px)', width: '100%' }}
      ></div>
    </div>
  )
}

export default memo(TradingViewWidget)

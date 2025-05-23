import "./style.scss"
import MarketStats from "./components/MarketStats"

function App() {
  return (
    <main>
      <div className="main-content">
        <header>
          <h1 className="text-3xl font-bold mb-2">Crypto Dashboard</h1>
          <p>Welcome back to your portfolio</p>
        </header>
        
        <MarketStats />
      </div>
    </main>
  )
}

export default App

import './index.css'
import { WeatherProvider } from './context/WeatherContext'
import Home from "./page/Home"

function App() {

  return (
    <WeatherProvider>
      <div className="appContainer">
        <Home />
      </div>
    </WeatherProvider>
  )
}

export default App

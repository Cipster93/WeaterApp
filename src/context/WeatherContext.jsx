import { createContext, useState, useEffect } from "react";

const WeatherContext = createContext();

const API_KEY = "0ffd15d893f37ce1de0c06c68cc3ab83";

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city = "Targoviste") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error(`Eroare API: ${response.status}`);
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastData = async (city = "Targoviste") => {
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok)
        throw new Error(`Eroare API forecast: ${response.status}`);
      const data = await response.json();

      const now = new Date();
      const today = now.getDate();

      const dailyForecast = [];
      const groupedByDay = {};

      data.list.forEach((item) => {
        const itemDate = new Date(item.dt_txt);
        const day = itemDate.getDate();
        if (day !== today) {
          if (!groupedByDay[day]) groupedByDay[day] = [];
          groupedByDay[day].push(item);
        }
      });

      Object.values(groupedByDay).forEach((items) => {
        let closest = items[0];
        let minDiff = Math.abs(
          new Date(items[0].dt_txt).getHours() - now.getHours()
        );
        items.forEach((item) => {
          const diff = Math.abs(
            new Date(item.dt_txt).getHours() - now.getHours()
          );
          if (diff < minDiff) {
            closest = item;
            minDiff = diff;
          }
        });
        dailyForecast.push(closest);
      });

      setForecastData(dailyForecast.slice(0, 5));
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchAllWeather = async (city = "Targoviste") => {
    await Promise.all([fetchWeatherData(city), fetchForecastData(city)]);
  };

  useEffect(() => {
    fetchAllWeather("Targoviste");
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        loading,
        error,
        fetchAllWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider, WeatherContext };

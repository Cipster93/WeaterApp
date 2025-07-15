// context/WeatherContext.js

import { createContext, useContext, useState, useEffect } from "react";

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
            console.log(data)
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
            if (!response.ok) throw new Error(`Eroare API forecast: ${response.status}`);
            const data = await response.json();
            const dailyForecast = data.list.filter(item =>
                item.dt_txt.includes('12:00:00')
            ).slice(0, 5);
            setForecastData(dailyForecast);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchAllWeather = async (city = "Targoviste") => {
        await Promise.all([
            fetchWeatherData(city),
            fetchForecastData(city)
        ]);
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

export const useWeather = () => useContext(WeatherContext);
export { WeatherProvider };

import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faGlobe, faWind, faDroplet, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { getWeatherIcon } from "../utils/utils/weatherIcons";
import { getTimeOfDay } from "../utils/utils/timeUtils";
import TimeIcon from "../components/TimeIcon";
import ForecastCard from "../components/ForecastCard";

const Home = () => {
    const {
        weatherData,
        forecastData,
        loading,
        error,
        fetchAllWeather,
    } = useWeather();

    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchAllWeather(city.trim());
        }
        setCity("");
    };

    const kelvin = weatherData?.main?.temp;
    const toCelsius = (k) => (k - 273.15).toFixed(1);
    const toFahrenheit = (k) => ((k - 273.15) * 9 / 5 + 32).toFixed(1);

    return (
        <div className="main-container">
            <div className="home-side-container">
                <div className="home">
                    {loading && <p>Se încarcă vremea...</p>}
                    {error && <p style={{ color: "red" }}>Eroare: {error}</p>}

                    {weatherData && !loading && !error && (
                        <div className="mt-4">
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                <TimeIcon timeOfDay={getTimeOfDay(weatherData)} />
                                {weatherData?.name} Weather
                            </h2>
                            <form onSubmit={handleSubmit} className="form">
                                <input
                                    type="text"
                                    placeholder="Enter location"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="input"
                                />
                                <button type="submit" className="search-button" aria-label="Caută">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
                                    </svg>
                                </button>
                            </form>
                            <p style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                                <FontAwesomeIcon icon={faThermometerHalf} size="lg" color="#E63946" />
                                T - {kelvin} K / {toCelsius(kelvin)} °C / {toFahrenheit(kelvin)} °F
                            </p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                <FontAwesomeIcon icon={faGlobe} size="lg" color="green" />
                                D - {weatherData?.weather?.[0]?.description
                                    ?.split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                    .join(' ')
                                }
                            </p>
                            <img
                                src={getWeatherIcon(weatherData?.weather?.[0]?.main)}
                                alt={weatherData?.weather?.[0]?.description}
                                style={{ width: "220px", height: "220px" }}
                            />
                        </div>
                    )}

                </div>
                <div className="home-side">
                    {weatherData && (
                        <>
                            <div className="weather-info-card">
                                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    Wind: {weatherData?.wind?.speed} m/s
                                </p>
                                <FontAwesomeIcon icon={faWind} size="sm" color="#4A90E2" />
                            </div>
                            <div className="weather-info-card">
                                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    Humidity: {weatherData?.main?.humidity}%
                                </p>
                                <FontAwesomeIcon icon={faDroplet} size="sm" color="#2196F3" />
                            </div>
                            <div className="weather-info-card">
                                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    Feels like: {toCelsius(weatherData?.main?.feels_like)}°C
                                </p>
                                <FontAwesomeIcon icon={faThermometerHalf} size="sm" color="#FF6B6B" />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="mini-weather-container">
                {forecastData.map((forecast) => (
                    <ForecastCard
                        key={forecast.dt}
                        forecast={forecast}
                        cityName={weatherData?.name || 'Unknown City'}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
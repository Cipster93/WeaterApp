import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faGlobe } from '@fortawesome/free-solid-svg-icons';
import TimeIcon from "./TimeIcon";
import { getWeatherIcon } from "../utils/weatherIcons";

const ForecastCard = ({ forecast, cityName }) => {

    if (!forecast) {
        return <div className="mini-weather-card">Loading...</div>;
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="mini-weather-card">
            <h4>{formatDate(forecast.dt)}</h4>
            <div className="city-info">
                <TimeIcon timeOfDay="day" />
                <span className="city-name">{cityName}</span>
            </div>
            <p>
                <FontAwesomeIcon icon={faThermometerHalf} size="sm" color="#E63946" />
                {` ${forecast.main.temp.toFixed(1)}°C`}
            </p>
            <p>
                <FontAwesomeIcon icon={faGlobe} size="sm" color="green" />
                {forecast.weather?.[0]?.description
                    ?.split(' ')
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                    .join(' ') || 'Clear Sky'}
            </p>
            <img
                src={getWeatherIcon(forecast.weather?.[0]?.main)}
                alt="weather"
            />
        </div>
    );
};

export default ForecastCard;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faThermometerHalf, 
  faTint, 
  faCloud, 
  faWind, 
  faInfoCircle, 
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Weather.css';

const CurrentWeather = ({ weather, unit }) => {
  if (!weather) return null;

  const {
    temperature,
    condition,
    humidity,
    windSpeed,
    description,
    feelsLike,
    uvIndex,
    visibility,
    cloudCover,
    datetime,
    city
  } = weather;

  return (
    <div className="weather-card">
      <div className="weather-info">
        <div className="location-row">
          <div className="location">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>Location: {city}</span>
          </div>
        </div>

        <div className="main-temp">
          <div className="temperature">
            <FontAwesomeIcon icon={faThermometerHalf} />
            <span>Temperature: {temperature.toFixed(1)}{unit}</span>
          </div>
          <div className="feels-like">
            <FontAwesomeIcon icon={faThermometerHalf} />
            <span>Feels Like: {feelsLike.toFixed(1)}{unit}</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="condition">
            <FontAwesomeIcon icon={faCloud} />
            <span>Condition: {condition}</span>
          </div>
          <div className="humidity">
            <FontAwesomeIcon icon={faTint} />
            <span>Humidity: {humidity}%</span>
          </div>
          <div className="wind-speed">
            <FontAwesomeIcon icon={faWind} />
            <span>Wind Speed: {windSpeed} km/h</span>
          </div>
          <div className="visibility">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>Visibility: {visibility} km</span>
          </div>
          <div className="cloud-cover">
            <FontAwesomeIcon icon={faCloud} />
            <span>Cloud Cover: {cloudCover}%</span>
          </div>
        </div>

        <div className="footer">
          <div className="description">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>Description: {description}</span>
          </div>
          <div className="last-updated">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>Last Updated: {new Date(datetime).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

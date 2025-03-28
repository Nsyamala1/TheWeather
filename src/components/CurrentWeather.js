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

const CurrentWeather = ({ weather }) => {
  if (!weather) return null;

  const {
    temp,
    humidity,
    condition,
    windSpeed,
    description,
    city
  } = weather;

  return (
    <div className="weather-cards">
      <div className="section-title">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
        <h2>Current Weather</h2>
      </div>

      <div className="cards-grid">
        <div className="weather-card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faThermometerHalf} />
          </div>
          <div className="card-content">
            <h3>Temperature</h3>
            <div className="card-value">{temp}°F</div>
          </div>
        </div>

        <div className="weather-card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faTint} />
          </div>
          <div className="card-content">
            <h3>Humidity</h3>
            <div className="card-value">{humidity}%</div>
          </div>
        </div>

        <div className="weather-card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faCloud} />
          </div>
          <div className="card-content">
            <h3>Condition</h3>
            <div className="card-value">{condition}</div>
          </div>
        </div>

        <div className="weather-card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faWind} />
          </div>
          <div className="card-content">
            <h3>Wind Speed</h3>
            <div className="card-value">{windSpeed} mph</div>
          </div>
        </div>

        <div className="weather-card description-card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          <div className="card-content">
            <h3>Description</h3>
            <div className="card-value">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

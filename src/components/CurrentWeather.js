import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faThermometerHalf, 
  faTint, 
  faCloud, 
  faWind, 
  faEye, 
  faMapMarkerAlt,
  faCloudSun,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import '../styles/CurrentWeather.css';

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
    <div className="weather-info">
      <div className="weather-main">
        <div className="location">
          <FontAwesomeIcon icon={faLocationDot} />
          {city}
        </div>
        
        <div className="temperature-display">
          {temperature.toFixed(1)}{unit}
        </div>
        
        <div className="feels-like">
          <FontAwesomeIcon icon={faThermometerHalf} />
          Feels like {feelsLike.toFixed(1)}{unit}
        </div>
      </div>

      <div className="weather-metrics-grid">
        <div className="metric-item">
          <div className="metric-icon">
            <FontAwesomeIcon icon={faCloudSun} />
          </div>
          <div className="metric-label">Condition</div>
          <div className="metric-value">{condition}</div>
        </div>

        <div className="metric-item">
          <div className="metric-icon">
            <FontAwesomeIcon icon={faTint} />
          </div>
          <div className="metric-label">Humidity</div>
          <div className="metric-value">{humidity}%</div>
        </div>

        <div className="metric-item">
          <div className="metric-icon">
            <FontAwesomeIcon icon={faWind} />
          </div>
          <div className="metric-label">Wind Speed</div>
          <div className="metric-value">{windSpeed} km/h</div>
        </div>

        <div className="metric-item">
          <div className="metric-icon">
            <FontAwesomeIcon icon={faEye} />
          </div>
          <div className="metric-label">Visibility</div>
          <div className="metric-value">{visibility} km</div>
        </div>

        <div className="metric-item">
          <div className="metric-icon">
            <FontAwesomeIcon icon={faCloud} />
          </div>
          <div className="metric-label">Cloud Cover</div>
          <div className="metric-value">{cloudCover}%</div>
        </div>

        <div className="metric-item">
          <div className="metric-icon">
            <FontAwesomeIcon icon={faCloudSun} />
          </div>
          <div className="metric-label">Weather</div>
          <div className="metric-value">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

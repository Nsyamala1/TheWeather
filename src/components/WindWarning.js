import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faWind } from '@fortawesome/free-solid-svg-icons';
import '../styles/WindWarning.css';

const WindWarning = ({ windSpeed, windGust }) => {
  const isHighWind = windSpeed >= 20 || windGust >= 20;
  
  if (!isHighWind) return null;

  return (
    <div className="wind-warning">
      <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon" />
      <div className="warning-content">
        <h3>High Wind Alert</h3>
        <div className="wind-details">
          {windSpeed >= 20 && (
            <p>
              <FontAwesomeIcon icon={faWind} /> Wind Speed: {Math.round(windSpeed)} mph
            </p>
          )}
          {windGust >= 20 && (
            <p>
              <FontAwesomeIcon icon={faWind} /> Wind Gusts: {Math.round(windGust)} mph
            </p>
          )}
        </div>
        <p className="warning-message">
          Exercise caution outdoors. Strong winds may affect outdoor activities.
        </p>
      </div>
    </div>
  );
};

export default WindWarning;

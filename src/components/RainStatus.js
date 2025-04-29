import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain, faUmbrella, faSun } from '@fortawesome/free-solid-svg-icons';
import '../styles/RainStatus.css';

const RainStatus = ({ condition, rainAmount }) => {
  const isRaining = condition?.toLowerCase().includes('rain');
  
  const getRainIntensity = (amount) => {
    if (amount === 0) return 'No rain';
    if (amount < 2.5) return 'Light rain';
    if (amount < 7.6) return 'Moderate rain';
    return 'Heavy rain';
  };

  const getRainIcon = () => {
    if (!isRaining) return faSun;
    if (rainAmount < 2.5) return faCloudRain;
    return faUmbrella;
  };

  const getRainMessage = () => {
    if (!isRaining) return 'Clear conditions - No rain expected';
    return `${getRainIntensity(rainAmount)} - ${rainAmount.toFixed(1)}mm in the last hour`;
  };

  return (
    <div className={`rain-status ${isRaining ? 'is-raining' : 'no-rain'}`}>
      <FontAwesomeIcon icon={getRainIcon()} className="rain-icon" />
      <div className="rain-content">
        <h3>Rain Status</h3>
        <p className="rain-message">
          {getRainMessage()}
        </p>
        {isRaining && (
          <p className="rain-advice">
            {rainAmount >= 7.6 ? (
              'Heavy rainfall - Consider indoor activities and bring an umbrella'
            ) : rainAmount >= 2.5 ? (
              'Moderate rainfall - Bring rain gear if going outside'
            ) : (
              'Light rainfall - Light rain gear recommended'
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default RainStatus;

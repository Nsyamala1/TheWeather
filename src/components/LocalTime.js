import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../styles/LocalTime.css';

const LocalTime = ({ timestamp, timezone }) => {
  const [localTime, setLocalTime] = useState(null);
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      // Get current UTC time in milliseconds
      const now = Math.floor(Date.now() / 1000);
      
      // Calculate local time by adding timezone offset
      const localTimestamp = now + timezone;
      const date = new Date(localTimestamp * 1000);
      
      // Format time in 12-hour format
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      
      setLocalTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
      setIsDay(hours >= 6 && hours < 18); // Consider 6 AM to 6 PM as day
    };

    // Update immediately and then every minute
    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [timezone]);

  if (!localTime) return null;

  return (
    <div className={`local-time ${isDay ? 'day-time' : 'night-time'}`}>
      <FontAwesomeIcon icon={faClock} className="time-icon" />
      <div className="time-content">
        <h3>Local Time</h3>
        <p className="time-display">
          <FontAwesomeIcon icon={isDay ? faSun : faMoon} className="period-icon" />
          {localTime}
        </p>
        <p className="time-period">
          {isDay ? 'Daytime' : 'Nighttime'}
        </p>
      </div>
    </div>
  );
};

export default LocalTime;

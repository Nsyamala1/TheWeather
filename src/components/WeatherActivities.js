import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faTshirt,
  faUmbrella,
  faHiking,
  faSwimmer,
  faBicycle,
  faRunning,
  faSkiing,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import '../styles/WeatherActivities.css';

const getActivitiesAndAttire = (condition, temperature) => {
  const suggestions = {
    Clear: {
      activities: [
        { icon: faHiking, text: 'Go hiking' },
        { icon: faBicycle, text: 'Cycling' },
        { icon: faSwimmer, text: 'Swimming' },
        { icon: faRunning, text: 'Outdoor sports' }
      ],
      attire: [
        { icon: faTshirt, text: 'Light, breathable clothing' },
        { icon: faSun, text: 'Sunscreen and hat' }
      ]
    },
    Clouds: {
      activities: [
        { icon: faHiking, text: 'Light hiking' },
        { icon: faBicycle, text: 'Cycling' },
        { icon: faRunning, text: 'Running' }
      ],
      attire: [
        { icon: faTshirt, text: 'Light layers' },
        { icon: faUmbrella, text: 'Light jacket' }
      ]
    },
    Rain: {
      activities: [
        { icon: faHome, text: 'Indoor activities' },
        { icon: faRunning, text: 'Visit a museum' },
        { icon: faBicycle, text: 'Indoor sports' }
      ],
      attire: [
        { icon: faUmbrella, text: 'Rain jacket and umbrella' },
        { icon: faTshirt, text: 'Waterproof shoes' }
      ]
    },
    Snow: {
      activities: [
        { icon: faSkiing, text: 'Skiing' },
        { icon: faHome, text: 'Indoor activities' },
        { icon: faSnowflake, text: 'Build a snowman' }
      ],
      attire: [
        { icon: faTshirt, text: 'Warm winter coat' },
        { icon: faUmbrella, text: 'Boots and gloves' }
      ]
    }
  };

  // Default to Clear if condition not found
  const weatherType = suggestions[condition] || suggestions.Clear;

  // Adjust suggestions based on temperature
  if (temperature < 0) {
    weatherType.attire.push({ icon: faTshirt, text: 'Thermal underwear' });
  } else if (temperature > 30) {
    weatherType.attire.push({ icon: faTshirt, text: 'Sun protection' });
  }

  return weatherType;
};

const WeatherActivities = ({ weather }) => {
  const { condition, temperature } = weather;
  const { activities, attire } = getActivitiesAndAttire(condition, temperature);

  return (
    <div className="weather-activities">
      <h2 className="activities-title">
        <FontAwesomeIcon icon={faSun} /> Recommended Activities
      </h2>
      
      <div className="suggestions-container">
        <div className="activities-section">
          <h3>Activities</h3>
          <div className="suggestions-list">
            {activities.map((activity, index) => (
              <div key={index} className="suggestion-item">
                <FontAwesomeIcon icon={activity.icon} />
                <span>{activity.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="attire-section">
          <h3>What to Wear</h3>
          <div className="suggestions-list">
            {attire.map((item, index) => (
              <div key={index} className="suggestion-item">
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherActivities;

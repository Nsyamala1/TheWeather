import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faSearch, faSpinner, faHeart } from '@fortawesome/free-solid-svg-icons';
import WindWarning from './WindWarning';
import RainStatus from './RainStatus';
import LocalTime from './LocalTime';
import WeatherChart from './WeatherChart';
import WeatherGames from './WeatherGames';
import WeatherActivities from './WeatherActivities';
import AuthModal from './AuthModal';
import FavoritesModal from './FavoritesModal';
import CurrentWeather from './CurrentWeather';
import { weatherService } from '../services/weatherService';
import { getWeatherEffect } from '../utils/weatherEffects';
import '../styles/Weather.css';
import '../styles/WeatherInfo.css';

const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [user, setUser] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Fetch current weather
      const currentData = await weatherService.getCurrentWeather(city);
      const tempC = currentData.temp;
      const tempF = celsiusToFahrenheit(tempC);
      const feelsLikeC = currentData.feelsLike;
      const feelsLikeF = celsiusToFahrenheit(feelsLikeC);
      
      const weatherData = {
        ...currentData,
        temp: isCelsius ? tempC : tempF,
        feelsLike: isCelsius ? feelsLikeC : feelsLikeF,
        tempC,
        tempF,
        feelsLikeC,
        feelsLikeF
      };
      
      // Fetch forecast data
      const forecast = await weatherService.getForecast(city);
      setForecastData(forecast);
      
      setWeather(weatherData);
      updateWeatherBackground(currentData.condition);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const updateWeatherBackground = (condition) => {
    const background = document.getElementById('weather-background');
    const effect = document.querySelector('.weather-effect');
    
    if (background && effect) {
      const { background: bgStyle, effect: effectStyle } = getWeatherEffect(condition);
      background.style.background = bgStyle;
      effect.style.cssText = effectStyle;
    }
  };

  return (
    <div className="weather-app">
      <div id="weather-background" className="weather-background">
        <div className="weather-effect"></div>
      </div>
      
      <div className="container">
        <header className="app-header">
          <h1><FontAwesomeIcon icon={faCloudSun} /> Weather Forecast</h1>
          <p className="subtitle">Real-time weather updates for any city</p>
          <div className="unit-toggle">
            <button 
              className={`toggle-btn ${isCelsius ? 'active' : ''}`}
              onClick={() => {
                setIsCelsius(true);
                if (weather) {
                  setWeather({
                    ...weather,
                    temp: weather.tempC,
                    feelsLike: weather.feelsLikeC
                  });
                }
              }}
            >
              °C
            </button>
            <button 
              className={`toggle-btn ${!isCelsius ? 'active' : ''}`}
              onClick={() => {
                setIsCelsius(false);
                if (weather) {
                  setWeather({
                    ...weather,
                    temp: weather.tempF,
                    feelsLike: weather.feelsLikeF
                  });
                }
              }}
            >
              °F
            </button>
          </div>
          
          <div className="auth-section">
            {!user ? (
              <div className="auth-buttons">
                <button onClick={() => setShowAuth(true)} className="auth-btn">
                  Login / Sign Up
                </button>
              </div>
            ) : (
              <div className="user-profile">
                <span>{user.email}</span>
                <button onClick={() => setShowFavorites(true)} className="profile-btn">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            )}
          </div>
        </header>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-group">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              required
              className="city-input"
            />
            <button type="submit" className="search-button">
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <><FontAwesomeIcon icon={faSearch} /> Get Weather</>
              )}
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {weather && (
          <main className="weather-info">
            <div className="weather-main">
              <CurrentWeather weather={weather} unit={isCelsius ? '°C' : '°F'} />
              <LocalTime 
                timestamp={weather.datetime}
                timezone={weather.timezone}
              />
              <WeatherChart 
                data={weather} 
                forecastData={forecastData}
                unit={isCelsius ? '°C' : '°F'} 
              />
              <WeatherActivities weather={weather} unit={isCelsius ? '°C' : '°F'} />
              <WeatherGames weather={weather} unit={isCelsius ? '°C' : '°F'} />
            </div>
            <div className="weather-alerts">
              <WindWarning 
                windSpeed={weather.windSpeed * 2.237} // Convert m/s to mph
                windGust={weather.windGust ? weather.windGust * 2.237 : 0} // Convert m/s to mph if available
              />
              <RainStatus 
                condition={weather.condition}
                rainAmount={weather.rain}
              />
            </div>
          </main>
        )}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={setUser} />}
      {showFavorites && <FavoritesModal onClose={() => setShowFavorites(false)} />}
    </div>
  );
};

export default WeatherApp;

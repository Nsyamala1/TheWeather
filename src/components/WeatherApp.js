import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faSearch, faSpinner, faHeart } from '@fortawesome/free-solid-svg-icons';
import WeatherChart from './WeatherChart';
import WeatherGames from './WeatherGames';
import AuthModal from './AuthModal';
import FavoritesModal from './FavoritesModal';
import CurrentWeather from './CurrentWeather';
import mockWeatherService from '../services/mockWeatherService';
import { getWeatherEffect } from '../utils/weatherEffects';
import '../styles/CurrentWeather.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const data = await mockWeatherService.getWeatherData(city);
      setWeather(data);
      updateWeatherBackground(data.condition);
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
            <CurrentWeather weather={weather} />
            <WeatherChart data={weather} />
            <WeatherGames weather={weather} />
          </main>
        )}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={setUser} />}
      {showFavorites && <FavoritesModal onClose={() => setShowFavorites(false)} />}
    </div>
  );
};

export default WeatherApp;

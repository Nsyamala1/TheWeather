import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faSearch, faSpinner, faHeart, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
  IonToggle,
  IonItem,
  IonLabel,
  IonToast,
  IonSpinner,
  IonAlert
} from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';
import { location } from 'ionicons/icons';
import WindWarning from './WindWarning';
import RainStatus from './RainStatus';
import LocalTime from './LocalTime';
import WeatherChart from './WeatherChart';
import WeatherActivities from './WeatherActivities';
import WeatherGames from './WeatherGames';
import AuthModal from './AuthModal';
import FavoritesModal from './FavoritesModal';
import CurrentWeather from './CurrentWeather';
import { weatherService } from '../services/weatherService';
import { getWeatherEffect } from '../utils/weatherEffects';
import '../styles/Weather.css';
import '../styles/TouchInteractions.css';

const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;

const WeatherApp = () => {
  const history = useHistory();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [user, setUser] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      
      if (permissionStatus.location === 'prompt' || permissionStatus.location === 'prompt-with-rationale') {
        setShowLocationPrompt(true);
      } else if (permissionStatus.location === 'granted') {
        await getCurrentLocationWeather();
      } else if (permissionStatus.location === 'denied') {
        setLocationError('Location access is denied. Please enable location access in your device settings.');
      }
    } catch (err) {
      console.error('Location permission error:', err);
      setLocationError('Unable to check location permissions. ' + err.message);
    }
  };

  const getCurrentLocationWeather = async () => {
    try {
      setLoading(true);
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
      const { latitude, longitude } = position.coords;
      
      const [currentData, forecast] = await Promise.all([
        weatherService.getCurrentWeather({ lat: latitude, lon: longitude }),
        weatherService.getForecast({ lat: latitude, lon: longitude })
      ]);

      const tempC = currentData.temp;
      const tempF = (tempC * 9/5) + 32;
      const feelsLikeC = currentData.feelsLike;
      const feelsLikeF = (feelsLikeC * 9/5) + 32;

      const weatherData = {
        ...currentData,
        tempC,
        tempF,
        feelsLikeC,
        feelsLikeF,
        temp: isCelsius ? tempC : tempF,
        feelsLike: isCelsius ? feelsLikeC : feelsLikeF
      };
      
      setWeather(weatherData);
      setForecastData(forecast);
      setCity(currentData.city); // Auto-populate the city input
      setLoading(false);
    } catch (err) {
      console.error('Get location error:', err);
      if (err.code === 1) {
        setLocationError('Location permission denied. Please enable location access in your device settings.');
      } else if (err.code === 2) {
        setLocationError('Location is not available. Please check your device settings.');
      } else if (err.code === 3) {
        setLocationError('Location request timed out. Please try again.');
      } else {
        setLocationError('Unable to get current location: ' + err.message);
      }
      setLoading(false);
    }
  };

  const handleLocationPrompt = async (allowed) => {
    setShowLocationPrompt(false);
    if (allowed) {
      try {
        await Geolocation.requestPermissions();
        await getCurrentLocationWeather();
      } catch (err) {
        setLocationError('Location permission denied');
      }
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

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

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    
    try {
      const [currentData, forecast] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city)
      ]);

      const tempC = currentData.temp;
      const tempF = (tempC * 9/5) + 32;
      const feelsLikeC = currentData.feelsLike;
      const feelsLikeF = (feelsLikeC * 9/5) + 32;

      const weatherData = {
        ...currentData,
        tempC,
        tempF,
        feelsLikeC,
        feelsLikeF,
        temp: isCelsius ? tempC : tempF,
        feelsLike: isCelsius ? feelsLikeC : feelsLikeF
      };
      
      setWeather(weatherData);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    setLocationLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const currentData = await weatherService.getCurrentWeather({ lat: latitude, lon: longitude });
          
          setCity(currentData.city);
          
          const tempC = currentData.temp;
          const tempF = (tempC * 9/5) + 32;
          const feelsLikeC = currentData.feelsLike;
          const feelsLikeF = (feelsLikeC * 9/5) + 32;

          const weatherData = {
            ...currentData,
            tempC,
            tempF,
            feelsLikeC,
            feelsLikeF,
            temp: isCelsius ? tempC : tempF,
            feelsLike: isCelsius ? feelsLikeC : feelsLikeF
          };
          
          setWeather(weatherData);
          const forecast = await weatherService.getForecast({ lat: latitude, lon: longitude });
          setForecastData(forecast);
        } catch (err) {
          setError(err.message || 'Failed to fetch weather data');
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        setError('Failed to get location. Please enable location services.');
        setLocationLoading(false);
      }
    );
  };

  const doRefresh = async (event) => {
    if (weather) {
      await handleSearch();
    }
    event.detail.complete();
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <FontAwesomeIcon icon={faCloudSun} style={{ color: 'white' }} /> Weather Forecast
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="weather-content" scrollY={true}>
        <IonAlert
          isOpen={showLocationPrompt}
          onDidDismiss={() => setShowLocationPrompt(false)}
          header="Location Access"
          message="Would you like to share your location to get local weather updates?"
          buttons={[
            {
              text: 'No Thanks',
              role: 'cancel',
              handler: () => handleLocationPrompt(false)
            },
            {
              text: 'Allow',
              handler: () => handleLocationPrompt(true)
            }
          ]}
        />
        <IonToast
          isOpen={!!locationError}
          message={locationError}
          duration={3000}
          onDidDismiss={() => setLocationError(null)}
          position="top"
          color="danger"
        />
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="ion-padding">
          <IonSearchbar
            value={city}
            onIonChange={(e) => setCity(e.detail.value)}
            placeholder={loading ? 'Loading...' : 'Enter city name'}
            className="ion-margin-bottom"
            disabled={loading}
            clearInput={true}
            debounce={300}
            showCancelButton="never"
          />
          
          <div className="ion-margin-bottom ion-text-center">
            <IonButton expand="block" onClick={handleSearch}>
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} />
              ) : (
                <>
                  <FontAwesomeIcon icon={faSearch} /> Search Weather
                </>
              )}
            </IonButton>
            <IonButton 
              expand="block" 
              fill="outline" 
              onClick={() => history.push('/route-weather')}
              className="ion-margin-top"
            >
              {locationLoading ? (
                <FontAwesomeIcon icon={faSpinner} />
              ) : (
                <>
                  <FontAwesomeIcon icon={faLocationCrosshairs} /> Route Weather
                </>
              )}
            </IonButton>
          </div>

          {error && <div className="error-message">{error}</div>}

          {weather && (
            <div className="weather-dashboard">
              <IonCard className="weather-main-card">
                <IonCardContent>
                  <CurrentWeather weather={weather} unit={isCelsius ? '°C' : '°F'} />
                  <LocalTime 
                    timestamp={weather.datetime}
                    timezone={weather.timezone}
                  />
                </IonCardContent>
              </IonCard>

              <IonCard className="weather-chart-card">
                <IonCardContent>
                  <WeatherChart 
                    data={weather} 
                    forecastData={forecastData}
                    unit={isCelsius ? '°C' : '°F'} 
                  />
                </IonCardContent>
              </IonCard>

              <div className="weather-activities-section">
                <IonCard className="weather-activities-card">
                  <IonCardContent>
                    <WeatherActivities weather={weather} unit={isCelsius ? '°C' : '°F'} />
                  </IonCardContent>
                </IonCard>
                
                <IonCard className="weather-games-card">
                  <IonCardContent>
                    <WeatherGames weather={weather} unit={isCelsius ? '°C' : '°F'} />
                  </IonCardContent>
                </IonCard>
              </div>

              <IonCard className="weather-alerts-section">
                <IonCardContent>
                  <WindWarning 
                    windSpeed={weather.windSpeed * 2.237}
                    windGust={weather.windGust ? weather.windGust * 2.237 : 0}
                  />
                  <RainStatus 
                    condition={weather.condition}
                    rainAmount={weather.rain}
                  />
                </IonCardContent>
              </IonCard>
            </div>
          )}
        </div>
      </IonContent>

      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)}
          onLogin={(user) => {
            setUser(user);
            setShowAuth(false);
          }}
        />
      )}

      {showFavorites && (
        <FavoritesModal
          onClose={() => setShowFavorites(false)}
          onSelectLocation={(loc) => {
            setCity(loc);
            setShowFavorites(false);
            handleSearch();
          }}
          userEmail={user?.email}
        />
      )}
    </>
  );
};

export default WeatherApp;

import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const GEO_URL = 'http://api.openweathermap.org/geo/1.0';
const WEATHER_URL = 'http://api.openweathermap.org/data/2.5';

export const weatherService = {
    getCurrentWeather: async (location) => {
        try {
            console.log('Using API Key:', API_KEY);
            const geoUrl = `${GEO_URL}/direct?q=${encodeURIComponent(location)}&limit=5&appid=${API_KEY}`;
            console.log('Geocoding URL:', geoUrl);
            const geoResponse = await axios.get(geoUrl);

            if (!geoResponse.data.length) {
                throw new Error('Location not found');
            }

            const { lat, lon, name: cityName } = geoResponse.data[0];

            // Get weather data using coordinates
            const response = await axios.get(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

            return {
                temperature: response.data.main.temp,
                condition: response.data.weather[0].main,
                description: response.data.weather[0].description,
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed,
                windGust: response.data.wind.gust,
                rain: response.data.rain ? response.data.rain['1h'] || 0 : 0, // Rain volume for the last hour in mm
                city: cityName,
                feelsLike: response.data.main.feels_like,
                visibility: response.data.visibility / 1000, // Convert to km
                cloudCover: response.data.clouds.all,
                datetime: response.data.dt,
                timezone: response.data.timezone, // Timezone offset in seconds from UTC
                icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            };
        } catch (error) {
            console.error('Weather API Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
        }
    },

    getForecast: async (location, days = 7) => {
        try {
            // First get coordinates for the location
            const geoUrl = `${GEO_URL}/direct?q=${encodeURIComponent(location)}&limit=5&appid=${API_KEY}`;
            const geoResponse = await axios.get(geoUrl);

            if (!geoResponse.data.length) {
                throw new Error('Location not found');
            }

            const { lat, lon } = geoResponse.data[0];

            // Get weather data using coordinates
            const response = await axios.get(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=${days * 8}`);
            
            // Group forecast data by day
            const dailyForecasts = response.data.list.reduce((acc, forecast) => {
                const date = new Date(forecast.dt * 1000).toLocaleDateString();
                if (!acc[date]) {
                    acc[date] = {
                        temps: [],
                        conditions: [],
                        humidity: [],
                        windSpeed: [],
                        icons: [],
                        date: new Date(forecast.dt * 1000)
                    };
                }
                acc[date].temps.push(forecast.main.temp);
                acc[date].conditions.push(forecast.weather[0].main);
                acc[date].humidity.push(forecast.main.humidity);
                acc[date].windSpeed.push(forecast.wind.speed);
                acc[date].icons.push(forecast.weather[0].icon);
                return acc;
            }, {});

            return Object.values(dailyForecasts).map(day => ({
                date: day.date,
                temperature: day.temps.reduce((a, b) => a + b) / day.temps.length,
                tempMax: Math.max(...day.temps),
                tempMin: Math.min(...day.temps),
                condition: day.conditions[Math.floor(day.conditions.length / 2)],
                humidity: day.humidity.reduce((a, b) => a + b) / day.humidity.length,
                windSpeed: day.windSpeed.reduce((a, b) => a + b) / day.windSpeed.length,
                icon: `http://openweathermap.org/img/wn/${day.icons[Math.floor(day.icons.length / 2)]}@2x.png`
            }));
        } catch (error) {
            console.error('Weather API Error:', error);
            throw new Error('Failed to fetch forecast data');
        }
    }
};

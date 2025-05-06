import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
    getCurrentWeather: async (location) => {
        let lat, lon, cityName;

        try {
            // Handle location input as either string (city name) or coordinates
            if (typeof location === 'string') {
                // Get coordinates from city name
                const geoUrl = `${GEO_URL}/direct?q=${encodeURIComponent(location)}&limit=5&appid=${API_KEY}`;
                const geoResponse = await axios.get(geoUrl);

                if (!geoResponse.data.length) {
                    throw new Error('Location not found');
                }

                const { lat: latitude, lon: longitude, name } = geoResponse.data[0];
                lat = latitude;
                lon = longitude;
                cityName = name;
            } else if (typeof location === 'object' && location.lat && location.lon) {
                // Use provided coordinates
                lat = location.lat;
                lon = location.lon;
                
                // Get city name from reverse geocoding
                const reverseGeoUrl = `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
                const reverseGeoResponse = await axios.get(reverseGeoUrl);
                cityName = reverseGeoResponse.data[0]?.name || 'Unknown Location';
            } else {
                throw new Error('Invalid location format');
            }

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
                icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            };
        } catch (error) {
            console.error('Weather API Error:', error.response?.data || error.message);
            throw error;
        }
    },

    getForecast: async (location, days = 7) => {
        try {
            let lat, lon;

            // Handle location input as either string (city name) or coordinates
            if (typeof location === 'string') {
                const geoUrl = `${GEO_URL}/direct?q=${encodeURIComponent(location)}&limit=5&appid=${API_KEY}`;
                const geoResponse = await axios.get(geoUrl);

                if (!geoResponse.data.length) {
                    throw new Error('Location not found');
                }

                const { lat: latitude, lon: longitude } = geoResponse.data[0];
                lat = latitude;
                lon = longitude;
            } else if (typeof location === 'object' && location.lat && location.lon) {
                lat = location.lat;
                lon = location.lon;
            } else {
                throw new Error('Invalid location format');
            }

            // Get forecast data using coordinates
            const response = await axios.get(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=${days * 8}`);

            // Process forecast data
            const processedData = response.data.list.reduce((acc, item) => {
                const date = new Date(item.dt * 1000).toISOString().split('T')[0];
                if (!acc[date]) {
                    acc[date] = {
                        date,
                        temps: [],
                        minTemps: [],
                        maxTemps: [],
                        conditions: [],
                        humidity: [],
                        windSpeed: [],
                        icons: []
                    };
                }

                acc[date].temps.push(item.main.temp);
                acc[date].minTemps.push(item.main.temp_min);
                acc[date].maxTemps.push(item.main.temp_max);
                acc[date].conditions.push(item.weather[0].main);
                acc[date].humidity.push(item.main.humidity);
                acc[date].windSpeed.push(item.wind.speed);
                acc[date].icons.push(item.weather[0].icon);

                return acc;
            }, {});

            // Calculate daily averages
            return Object.values(processedData).map(day => ({
                date: day.date,
                temperature: day.temps.reduce((a, b) => a + b) / day.temps.length,
                tempMin: Math.min(...day.minTemps),
                tempMax: Math.max(...day.maxTemps),
                condition: day.conditions[Math.floor(day.conditions.length / 2)],
                humidity: day.humidity.reduce((a, b) => a + b) / day.humidity.length,
                windSpeed: day.windSpeed.reduce((a, b) => a + b) / day.windSpeed.length,
                icon: `https://openweathermap.org/img/wn/${day.icons[Math.floor(day.icons.length / 2)]}@2x.png`
            }));
        } catch (error) {
            console.error('Weather API Error:', error);
            throw error;
        }
    }
};

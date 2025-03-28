// Mock weather conditions and descriptions
const weatherConditions = [
  { condition: 'Sunny', descriptions: ['Clear skies', 'Beautiful sunny day', 'Bright and clear'] },
  { condition: 'Cloudy', descriptions: ['Partly cloudy', 'Mostly cloudy', 'Overcast'] },
  { condition: 'Rainy', descriptions: ['Light rain', 'Scattered showers', 'Heavy rainfall'] },
  { condition: 'Stormy', descriptions: ['Thunderstorms', 'Lightning and rain', 'Severe weather'] },
  { condition: 'Snowy', descriptions: ['Light snow', 'Heavy snowfall', 'Snow flurries'] },
];

// Generate random number within a range
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Generate random weather history data
const generateHistoryData = (baseTemp, baseHumidity, count = 24) => {
  const data = [];
  const hourNow = new Date().getHours();

  for (let i = 0; i < count; i++) {
    const hour = (hourNow - (count - 1 - i) + 24) % 24;
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    
    // Add some random variation to base values
    const temp = baseTemp + random(-5, 5);
    const humidity = Math.min(Math.max(baseHumidity + random(-10, 10), 0), 100);

    data.push({
      time: timeStr,
      temp,
      humidity,
    });
  }

  return data;
};

// Mock weather service
const mockWeatherService = {
  getWeatherData: (city) => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Generate base values based on city string length for consistency
        const baseTemp = 65 + (city.length * 2);
        const baseHumidity = 50 + (city.length * 3) % 30;
        
        // Pick a random weather condition
        const weatherIndex = Math.floor(Math.random() * weatherConditions.length);
        const weather = weatherConditions[weatherIndex];
        
        const mockData = {
          city,
          temp: baseTemp,
          humidity: baseHumidity,
          condition: weather.condition,
          description: weather.descriptions[random(0, weather.descriptions.length - 1)],
          windSpeed: random(5, 45),
          history: generateHistoryData(baseTemp, baseHumidity),
          timestamp: new Date().toISOString(),
        };

        resolve(mockData);
      }, 800); // Simulate network delay
    });
  },

  // Get weather forecast for next few days
  getForecast: (city) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const forecast = [];
        const baseTemp = 65 + (city.length * 2);

        for (let i = 0; i < 5; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i);

          forecast.push({
            date: date.toLocaleDateString(),
            temp: baseTemp + random(-10, 10),
            humidity: random(40, 80),
            condition: weatherConditions[random(0, weatherConditions.length - 1)].condition,
          });
        }

        resolve(forecast);
      }, 600);
    });
  },
};

export default mockWeatherService;

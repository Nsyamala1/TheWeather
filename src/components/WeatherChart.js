import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherChart = ({ data, forecastData, unit }) => {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.06)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 10,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 10,
        },
      },
    },
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const temperatureData = {
    labels: forecastData?.map(f => formatDate(f.date)) || [],
    datasets: [
      {
        label: `Max Temperature (${unit})`,
        data: forecastData?.map(f => unit === '°F' ? f.tempMax * 9/5 + 32 : f.tempMax) || [],
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        fill: false,
        tension: 0.4,
      },
      {
        label: `Average Temperature (${unit})`,
        data: forecastData?.map(f => unit === '°F' ? f.temperature * 9/5 + 32 : f.temperature) || [],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: `Min Temperature (${unit})`,
        data: forecastData?.map(f => unit === '°F' ? f.tempMin * 9/5 + 32 : f.tempMin) || [],
        borderColor: '#0891b2',
        backgroundColor: 'rgba(8, 145, 178, 0.1)',
        fill: false,
        tension: 0.4,
      }
    ],
  };

  const humidityData = {
    labels: forecastData?.map(f => formatDate(f.date)) || [],
    datasets: [{
      label: 'Humidity (%)',
      data: forecastData?.map(f => f.humidity) || [],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
    }],
  };

  return (
    <div className="weather-trends">
      <h2>Weather Trends</h2>
      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>Temperature Trend</h3>
          <Line
            data={temperatureData}
            options={{
              ...commonOptions,
              plugins: {
                ...commonOptions.plugins,
                title: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <div className="chart-wrapper">
          <h3>Humidity Trend</h3>
          <Line
            data={humidityData}
            options={{
              ...commonOptions,
              plugins: {
                ...commonOptions.plugins,
                title: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;

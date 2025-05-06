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
        align: 'start',
        labels: {
          usePointStyle: true,
          padding: 15,
          boxWidth: 6,
          boxHeight: 6,
          font: {
            size: 11,
            family: "'Inter', sans-serif",
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        titleFont: {
          size: 12,
          family: "'Inter', sans-serif",
          weight: '600',
        },
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.04)',
          drawBorder: false,
          lineWidth: 1,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
            weight: '500',
          },
          padding: 8,
          color: '#6b7280',
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
            weight: '500',
          },
          padding: 8,
          color: '#6b7280',
          maxRotation: 0,
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
        data: forecastData?.map(f => unit === '°F' ? (f.tempMax * 9/5 + 32).toFixed(1) : f.tempMax.toFixed(1)) || [],
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.08)',
        fill: false,
        tension: 0.4,
      },
      {
        label: `Average Temperature (${unit})`,
        data: forecastData?.map(f => unit === '°F' ? (f.temperature * 9/5 + 32).toFixed(1) : f.temperature.toFixed(1)) || [],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        fill: true,
        tension: 0.4,
      },
      {
        label: `Min Temperature (${unit})`,
        data: forecastData?.map(f => unit === '°F' ? (f.tempMin * 9/5 + 32).toFixed(1) : f.tempMin.toFixed(1)) || [],
        borderColor: '#0891b2',
        backgroundColor: 'rgba(8, 145, 178, 0.08)',
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
      backgroundColor: 'rgba(16, 185, 129, 0.08)',
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

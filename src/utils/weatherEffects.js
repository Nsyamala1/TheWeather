const weatherEffects = {
  Sunny: {
    background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    effect: `
      background-image: 
        radial-gradient(circle at 50% -20%, #ffd86f 0%, transparent 75%),
        linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.2) 100%);
    `
  },
  Cloudy: {
    background: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
    effect: `
      background-image: 
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 70%),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
    `
  },
  Rainy: {
    background: 'linear-gradient(120deg, #4facfe 0%, #00f2fe 100%)',
    effect: `
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.2) 10px,
        rgba(255, 255, 255, 0.2) 20px
      );
      animation: rain 0.5s linear infinite;
    `
  },
  Stormy: {
    background: 'linear-gradient(120deg, #283E51 0%, #4B79A1 100%)',
    effect: `
      background-image: 
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
      animation: storm 3s ease infinite;
    `
  },
  Snowy: {
    background: 'linear-gradient(120deg, #E3FDF5 0%, #FFE6FA 100%)',
    effect: `
      background-image: 
        radial-gradient(circle at 50% 50%, white 0%, transparent 10%),
        radial-gradient(circle at 30% 30%, white 0%, transparent 10%),
        radial-gradient(circle at 70% 70%, white 0%, transparent 10%);
      animation: snow 3s ease infinite;
    `
  }
};

export const getWeatherEffect = (condition) => {
  return weatherEffects[condition] || weatherEffects.Sunny;
};

// Add these styles to your CSS
export const weatherAnimations = `
  @keyframes rain {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 20px;
    }
  }

  @keyframes storm {
    0%, 100% {
      opacity: 0.9;
    }
    50% {
      opacity: 0.7;
    }
  }

  @keyframes snow {
    0%, 100% {
      background-position: 0 0;
    }
    50% {
      background-position: 10px 10px;
    }
  }
`;

export default weatherEffects;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';

const WeatherGames = ({ weather }) => {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const handleGuess = (e) => {
    e.preventDefault();
    const userGuess = parseFloat(guess);
    const actualTemp = weather?.temp;

    if (isNaN(userGuess)) {
      setFeedback('Please enter a valid number');
      return;
    }

    const difference = Math.abs(userGuess - actualTemp);
    let newFeedback = '';
    let points = 0;

    if (difference === 0) {
      newFeedback = 'Perfect guess! +10 points';
      points = 10;
    } else if (difference <= 2) {
      newFeedback = 'Very close! +5 points';
      points = 5;
    } else if (difference <= 5) {
      newFeedback = 'Close! +2 points';
      points = 2;
    } else {
      newFeedback = `Off by ${difference.toFixed(1)}°F. Try again!`;
    }

    setScore(prevScore => prevScore + points);
    setFeedback(newFeedback);
    setGuess('');
  };

  return (
    <section className="weather-games">
      <h2>Weather Games</h2>
      <div className="games-grid">
        <div className="game-card temperature">
          <h3><FontAwesomeIcon icon={faThermometerHalf} /> Temperature Challenge</h3>
          <p>Guess the current temperature!</p>
          
          <form onSubmit={handleGuess} className="game-form">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter temperature in °F"
              className="game-input"
              step="0.1"
            />
            <button type="submit" className="game-button">Submit Guess</button>
          </form>
          
          {feedback && (
            <div className="game-feedback">
              {feedback}
            </div>
          )}
          
          <div className="game-score">
            Score: {score}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherGames;

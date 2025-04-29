import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faGamepad } from '@fortawesome/free-solid-svg-icons';
import '../styles/WeatherGames.css';

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
    <div className="weather-games">
      <h2 className="game-title">
        <FontAwesomeIcon icon={faGamepad} /> Temperature Guessing Game
      </h2>
      <form onSubmit={handleGuess} className="game-form">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Guess the temperature"
          className="game-input"
        />
        <button type="submit" className="game-button">
          <FontAwesomeIcon icon={faThermometerHalf} /> Guess
        </button>
      </form>
      {feedback && (
        <div className={`feedback ${score > 0 ? 'success' : 'error'}`}>
          {feedback}
        </div>
      )}
      <div className="score">
        <FontAwesomeIcon icon={faGamepad} /> Score: {score}
      </div>
    </div>
  );
};

export default WeatherGames;

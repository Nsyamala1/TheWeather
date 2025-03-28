import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

const FavoritesModal = ({ onClose, favorites = [], onSelect, onRemove }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2>Favorite Cities</h2>
        
        <div className="favorites-list">
          {favorites.length === 0 ? (
            <p className="no-favorites">No favorite cities yet</p>
          ) : (
            favorites.map((city) => (
              <div key={city} className="favorite-item">
                <button
                  className="favorite-city-button"
                  onClick={() => {
                    onSelect(city);
                    onClose();
                  }}
                >
                  {city}
                </button>
                <button
                  className="remove-favorite"
                  onClick={() => onRemove(city)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;

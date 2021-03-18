import React from 'react';

const CardProgressBar = ({ progress }) => {
  return (
    <div className="card__progress-bar">
      <div
        className="card__progress-fill"
        style={{ flexBasis: `${progress}%` }}
      >
        <span className="card__progress-fill--text">{progress}%</span>
      </div>
    </div>
  );
};

export default CardProgressBar;

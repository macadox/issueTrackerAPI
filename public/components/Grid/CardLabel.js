import React from 'react';

const CardLabel = ({ icon, iconAltText, text }) => {
  return (
    <div className="ui-label ui-label--info">
      <img src={icon} alt={iconAltText} className="ui-label__icon" />
      <span className="ui-label__text">{text}</span>
    </div>
  );
};

export default CardLabel;

import React from 'react';

const TemplateImmutable = ({ inputKey, inputValue, labelText }) => {
  return (
    <div className="form-template__field">
      <label className="form-template__label" htmlFor={inputKey}>
        {labelText}
      </label>
      <p id={inputKey} className="form-template__input form-template__input--readonly">
        {inputValue}
      </p>
    </div>
  );
};

export default TemplateImmutable;

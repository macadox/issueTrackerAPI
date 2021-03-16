import React, { useState, useEffect } from 'react';

const TemplateSelect = ({
  mode,
  inputKey,
  labelText,
  update,
  options,
  inputValue,
  className,
}) => {
  const [term, setTerm] = useState(inputValue || options[0]);

  useEffect(() => {
    update(inputKey, term);
  }, [term]);

  if (mode === 'preview') {
    return (
      <div className={`form-template__field ${className ? className : ''}`}>
        {labelText && (
          <label className="form-template__label" htmlFor={inputKey}>
            {labelText}
          </label>
        )}
        <p
          id={inputKey}
          className="form-template__input form-template__input--readonly"
        >
          {inputValue}
        </p>
      </div>
    );
  }

  return (
    <div className={`form-template__field ${className ? className : ''}`}>
      {labelText && (
        <label htmlFor={inputKey} className="form-template__label">
          {labelText}
        </label>
      )}
      <select
        className="form-template__select"
        value={term || ''}
        name={inputKey}
        id={inputKey}
        onChange={(e) => setTerm(e.target.value)}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TemplateSelect;

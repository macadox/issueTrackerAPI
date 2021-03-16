import React, { useState, useEffect } from 'react';

const TemplateCheckbox = ({
  mode,
  inputKey,
  labelText,
  update,
  inputValue,
  className,
  readOnly,
}) => {
  const [term, setTerm] = useState(inputValue || false);

  useEffect(() => {
    update(inputKey, term);
  }, [term]);

  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 32: {
        e.preventDefault();
        setTerm(!term);
        break;
      }
    }
  };

  if (mode === 'preview' || (mode === 'update' && readOnly)) {
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
          {inputValue ? 'true' : 'false'}
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
      <div
        className={`checkbox ${term === true ? 'checkbox--checked' : ''}`}
        aria-checked={term}
        tabIndex={0}
        onClick={() => setTerm(!term)}
        onKeyDown={handleKeyDown}
      ></div>
    </div>
  );
};

export default TemplateCheckbox;

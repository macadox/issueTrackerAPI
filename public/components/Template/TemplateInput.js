import React, { useState, useEffect } from 'react';

const TemplateInput = ({
  mode,
  inputKey,
  type,
  labelText,
  update,
  inputValue,
  className,
  readOnly,
}) => {
  const [term, setTerm] = useState(inputValue || '');

  useEffect(() => {
    const inputValue = type === 'number' ? parseInt(term) || 0 : term;
    update(inputKey, inputValue);
  }, [term]);

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
      <input
        onChange={(e) => setTerm(e.target.value)}
        id={inputKey}
        type={type}
        name={inputKey}
        value={term || ''}
        className="form-template__input"
      />
    </div>
  );
};

export default TemplateInput;

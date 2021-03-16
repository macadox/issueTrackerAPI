import React, { useState, useEffect } from 'react';

const TemplateTextarea = ({
  mode,
  inputValue,
  inputKey,
  labelText,
  update,
  className,
}) => {
  const [term, setTerm] = useState(inputValue || null);

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
          className="form-template__textarea form-template__textarea--readonly"
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
      <textarea
        onChange={(e) => setTerm(e.target.value)}
        name={inputKey}
        id={inputKey}
        className="form-template__textarea"
        value={term || ''}
      ></textarea>
    </div>
  );
};

export default TemplateTextarea;

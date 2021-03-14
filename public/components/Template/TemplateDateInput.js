import '../../css/flatpickr_theme.css';

import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';

const TemplateDateInput = ({
  mode,
  inputKey,
  labelText,
  update,
  inputValue,
  className,
  ...props
}) => {
  const [term, setTerm] = useState(inputValue || null);

  useEffect(() => {
    update(inputKey, term);
  }, [term]);

  if (mode === 'preview') {
    return (
      <div className={`form-template__field ${className ? className : ''}`}>
        <label className="form-template__label" htmlFor={inputKey}>
          {labelText}
        </label>
        <p
          id={inputKey}
          className="form-template__input form-template__input--readonly"
        >
          {term && new Intl.DateTimeFormat('en-GB').format(new Date(term))}
        </p>
      </div>
    );
  }

  return (
    <div className={`form-template__field ${className ? className : ''}`}>
      <label htmlFor={inputKey} className="form-template__label">
        {labelText}
      </label>
      <Flatpickr
        className="form-template__input"
        id={inputKey}
        options={{ dateFormat: 'm/d/Y' }}
        name={inputKey}
        value={term || null}
        onChange={(date) => setTerm(date[0])}
        placeholder="MM/DD/YYYY"
      />
    </div>
  );
};

export default TemplateDateInput;

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

  // useEffect(() => {
  //   setTerm(inputValue);
  // }, [inputValue]);

  useEffect(() => {
    update(inputKey, term);
  }, [term]);

  return (
    <div className={`form-template__field ${className}`}>
      <label htmlFor={inputKey} className="form-template__label">
        {labelText}
      </label>
      <Flatpickr
        className="form-template__input"
        id={inputKey}
        options={{ dateFormat: 'm/d/Y' }}
        name={inputKey}
        value={term || null}
        onChange={(date) => setTerm(date)}
        placeholder="MM/DD/YYYY"
      />
    </div>
  );
};

export default TemplateDateInput;

import React, { useState, useEffect } from 'react';

const TemplateSelect = ({
  mode,
  inputKey,
  labelText,
  update,
  options,
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

import React, { useState, useEffect } from 'react';

const FormInput = ({
  id,
  labelText,
  isSubmitting,
  className,
  value,
  ...props
}) => {
  const [term, setTerm] = useState(value || '');

  useEffect(() => {
    if (value) {
      setTerm(value);
    }
  }, [value]);

  return (
    <div className="form__group">
      <input
        name={id}
        onChange={(e) => setTerm(e.target.value)}
        id={id}
        value={term}
        className={`form__input ${className}`}
        {...props}
      />
      <label
        htmlFor={id}
        className={`form__label ${term ? 'form__label--float' : ''}`}
      >
        <span>{labelText}</span>
      </label>
    </div>
  );
};

export default FormInput;

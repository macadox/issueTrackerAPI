import React, { useState, useEffect } from 'react';

const FormInput = ({
  id,
  labelText,
  isSubmitSuccess,
  isSubmitting,
  className,
  value,
  ...props
}) => {
  const [term, setTerm] = useState(value || '');

  useEffect(() => {
    if (isSubmitSuccess) {
      setTerm('');
    }
  }, [isSubmitSuccess]);

  return (
    <div className="form__group">
      <input
        name={id}
        onChange={(e) => setTerm(e.target.value)}
        id={id}
        value={term}
        className={`form__input ${className}`}
        {...props}
        disabled={isSubmitSuccess}
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

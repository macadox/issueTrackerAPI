import React, { useState, useEffect } from 'react';

const FormInput = ({
  id,
  labelText,
  isSubmitSuccess,
  isSubmitting,
  ...props
}) => {
  const [term, setTerm] = useState('');

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
        className="form__input"
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

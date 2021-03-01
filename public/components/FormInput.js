import React, { useState } from 'react';

const FormInput = ({ id, labelText, ...props }) => {
  const [term, setTerm] = useState('');

  return (
    <div className="form__group">
      <input
        name={id}
        onChange={(e) => setTerm(e.target.value)}
        id={id}
        value={term}
        className="form__input"
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

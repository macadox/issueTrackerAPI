import React, { useState, useEffect } from 'react';

const TemplateInput = ({
  mode,
  inputKey,
  type,
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
    const inputValue = type === 'number' ? parseInt(term) || 0 : term;
    update(inputKey, inputValue);
  }, [term]);

  return (
    <div className={`form-template__field ${className}`}>
      <label htmlFor={inputKey} className="form-template__label">
        {labelText}
      </label>
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

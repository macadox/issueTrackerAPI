import React, { useState, useEffect } from 'react';

const TemplateTextarea = ({
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

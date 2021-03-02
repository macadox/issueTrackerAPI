import React, { useState, useEffect, useRef } from 'react';

const AuthForm = ({ className, callback, children }) => {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    callback(formData);
  };

  return (
    <form
      ref={formRef}
      className={`form__body ${className}`}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

export default AuthForm;

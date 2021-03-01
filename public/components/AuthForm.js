import React, { useState, useEffect, useRef } from 'react';

const AuthForm = ({ className, callback, children }) => {
  const formRef = useRef(null);

  // const sendData = async () => {
  //   try {
  //     const formData = new FormData(formRef.current);
  //     const res = await fetch(endpoint, {
  //       method: method,
  //       credentials: 'include',
  //       body: formData,
  //     });
  //     const resData = await res.json();
  //     if (!res.ok) {
  //       // TODO: Alert
  //       console.log('error: ', resData.message);
  //     }
  //     console.log(resData);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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

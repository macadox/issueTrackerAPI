import React, { useEffect } from 'react';
import successImg from '../assets/img/ui/tick.svg';
import errorImg from '../assets/img/ui/close.svg';

import { useGlobalContext } from '../context';

const Alert = ({ type, message }) => {
  const { hideAlert } = useGlobalContext();

  useEffect(() => {
    let timeoutId = setTimeout(hideAlert, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [type, message]);

  return (
    <div
      className={`alert alert--${type}`}
      role="alertdialog"
      onClick={hideAlert}
    >
      {type === 'error' ? (
        <img
          src={errorImg}
          alt="error"
          className="alert__icon alert__icon--error"
        />
      ) : (
        <img src={successImg} alt="success" className="alert__icon" />
      )}
      <p className="alert__message">{message}</p>
    </div>
  );
};

export default Alert;

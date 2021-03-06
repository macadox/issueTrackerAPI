import React, { useEffect } from 'react';
import successImg from 'url:../assets/img/ui/tick.svg';
import errorImg from 'url:../assets/img/ui/close.svg';
import { FaTimes } from 'react-icons/fa';

import { useGlobalContext } from '../context';

const Alert = ({ type, message }) => {
  const { hideAlert, alertPersistent } = useGlobalContext();

  useEffect(() => {
    if (alertPersistent) return;
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
      <button className="btn btn--icon btn--transparent btn--alert">
        <FaTimes />
      </button>
    </div>
  );
};

export default Alert;

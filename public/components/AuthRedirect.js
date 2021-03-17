import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useGlobalContext } from '../context';

const AuthRedirect = ({ alert: { message, type }, ...props }) => {
  const { dispatchErrorAlert, dispatchAlert } = useGlobalContext();

  useEffect(() => {
    if (message && type) {
      if (type === 'error') {
        dispatchErrorAlert(message);
      } else if (type === 'success') {
        dispatchAlert({ data: message });
      }
    }
  }, []);

  return <Redirect {...props} />;
};

export default AuthRedirect;

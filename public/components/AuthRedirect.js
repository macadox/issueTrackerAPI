import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useGlobalContext } from '../context';

const AuthRedirect = ({message, ...props }) => {
  const { dispatchErrorAlert } = useGlobalContext();

  useEffect(() => {
    dispatchErrorAlert(message);
  }, []);

  return <Redirect {...props} />;
};

export default AuthRedirect;

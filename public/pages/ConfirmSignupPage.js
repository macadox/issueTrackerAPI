import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useGlobalContext } from '../context';

const ConfirmSignupPage = ({}) => {
  const { confirmSignup } = useGlobalContext();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      confirmSignup(token);
    }
  }, []);

  return <Redirect to="/" />;
};

export default ConfirmSignupPage;

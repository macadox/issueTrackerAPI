import React from 'react';
import { Route } from 'react-router-dom';
import AuthRedirect from './AuthRedirect';
import { useGlobalContext } from '../context';

const AuthRoute = ({ type, ...props }) => {
  const { user } = useGlobalContext();

  // if (type === 'guest' && !user) return <Redirect to="/" />;
  if (type === 'private' && !user) {
    return (
      <AuthRedirect
        to="/login"
        message={'You need to authenticate to proceed'}
      />
    );
  }

  return <Route {...props} />;
};

export default AuthRoute;

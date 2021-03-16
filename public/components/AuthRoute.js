import React from 'react';
import { Route } from 'react-router-dom';
import AuthRedirect from './AuthRedirect';
import { useGlobalContext } from '../context';

const AuthRoute = ({ type, restrictTo, ...props }) => {
  const { user, authenticationComplete } = useGlobalContext();

  // if (type === 'guest' && !user) return <Redirect to="/" />;
  if (type === 'private' && authenticationComplete && !user) {
    return (
      <AuthRedirect
        to="/login"
        message={'You need to authenticate to proceed'}
      />
    );
  }

  if (
    type === 'private' &&
    restrictTo &&
    authenticationComplete &&
    user &&
    !user.roles.includes(restrictTo)
  ) {
    return (
      <AuthRedirect
        to="/"
        message={
          'You do not have necessary priviliages. Contact administrator.'
        }
      />
    );
  }

  return <Route {...props} />;
};

export default AuthRoute;

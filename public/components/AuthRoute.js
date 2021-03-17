import React from 'react';
import { Route } from 'react-router-dom';
import AuthRedirect from './AuthRedirect';
import { useGlobalContext } from '../context';

const AuthRoute = ({ type, restrictTo, ...props }) => {
  const { user, authenticationComplete } = useGlobalContext();

  if (type === 'private' && authenticationComplete && !user) {
    return (
      <AuthRedirect
        to="/login"
        alert={{
          message: 'You need to authenticate to proceed',
          type: 'error',
        }}
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
        alert={{
          message:
            'You do not have necessary priviliages. Contact administrator.',
          type: 'error',
        }}
      />
    );
  }

  return <Route {...props} />;
};

export default AuthRoute;

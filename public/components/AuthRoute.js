import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useGlobalContext } from '../context';

const AuthRoute = ({ type, ...props }) => {
  const { user } = useGlobalContext;

  if (type === 'guest' && !user) return <Redirect to="/" />;
  else if (type === 'private' && !user) return <Redrect to="/login" />;

  return <Route {...props} />;
};

export default AuthRoute;

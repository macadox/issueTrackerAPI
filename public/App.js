import './App.css';
import React from 'react';
import { Router, Switch, HashRouter } from 'react-router-dom';

// Components
import Header from './components/Header/index';
import Footer from './components/Footer';
import Alert from './components/Alert';
import AuthRoute from './components/AuthRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConfirmSignupPage from './pages/ConfirmSignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import AccountPage from './pages/AccountPage';

import history from './services/history';
import { useGlobalContext } from './context';

const App = () => {
  const { showAlert, alert } = useGlobalContext();
  return (
    <HashRouter history={history}>
      <Header />
      <Switch>
        <AuthRoute exact path="/">
          <HomePage />
        </AuthRoute>
        <AuthRoute path="/login">
          <LoginPage />
        </AuthRoute>
        <AuthRoute
          exact
          path="/signup/:token"
          children={<ConfirmSignupPage />}
        ></AuthRoute>
        <AuthRoute exact path="/signup">
          <SignupPage />
        </AuthRoute>
        <AuthRoute path="/forgotPassword">
          <ForgotPasswordPage />
        </AuthRoute>
        <AuthRoute
          path="/resetPassword/:token"
          children={<ResetPasswordPage />}
        ></AuthRoute>
        <AuthRoute type="private" path="/me">
          <AccountPage />
        </AuthRoute>
      </Switch>
      <Footer />
      {showAlert && <Alert type={alert.type} message={alert.message} />}
    </HashRouter>
  );
};

export default App;

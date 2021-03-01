import './App.css';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/Header/index';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import history from './services/history';

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPasswordPage />
        </Route>
        <Route path="/resetPassword">
          <ResetPasswordPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

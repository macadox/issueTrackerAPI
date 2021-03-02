import './App.css';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/Header/index';
import Footer from './components/Footer';
import Alert from './components/Alert';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConfirmSignupPage from './pages/ConfirmSignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import history from './services/history';
import { useGlobalContext } from './context';

const App = () => {
  const { showAlert, alert } = useGlobalContext();
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
        <Route
          exact
          path="/signup/:token"
          children={<ConfirmSignupPage />}
        ></Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPasswordPage />
        </Route>
        <Route
          path="/resetPassword/:token"
          children={<ResetPasswordPage />}
        ></Route>
      </Switch>
      <Footer />
      {showAlert && <Alert type={alert.type} message={alert.message} />}
    </Router>
  );
};

export default App;

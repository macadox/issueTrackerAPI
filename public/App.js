import './App.css';
import React from 'react';
import { Router, Switch } from 'react-router-dom';

// Components
import Header from './components/Header/index';
import Footer from './components/Footer';
import Alert from './components/Alert';
import AuthRoute from './components/AuthRoute';

// Pages
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConfirmSignupPage from './pages/ConfirmSignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';

import ProjectsOverview from './pages/ProjectsOverview';
import IssuesOverview from './pages/IssuesOverview';
import ProjectPage from './pages/ProjectPage';
import IssuePage from './pages/IssuePage';
import UserPage from './pages/UserPage';

import history from './services/history';
import { useGlobalContext } from './context';

const App = () => {
  const { showAlert, alert } = useGlobalContext();
  return (
    <Router history={history}>
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
        <AuthRoute type="private" path="/admin" restrictTo="admin" exact>
          <AdminPage />
        </AuthRoute>
        <AuthRoute
          type="private"
          path={[
            '/admin/users/:userId/preview',
            '/admin/users/:userId/update',
            '/admin/users/create',
          ]}
          children={<UserPage />}
        />
        <AuthRoute type="private" path="/me">
          <AccountPage />
        </AuthRoute>
        <AuthRoute type="private" path="/projects" exact>
          <ProjectsOverview />
        </AuthRoute>
        <AuthRoute
          type="private"
          path={[
            '/projects/:projectId/preview',
            '/projects/:projectId/update',
            '/projects/create',
          ]}
          children={<ProjectPage />}
        />
        <AuthRoute
          type="private"
          path="/projects/:projectId/issues"
          children={<IssuesOverview />}
          exact
        />
        <AuthRoute
          type="private"
          path={[
            '/projects/:projectId/issues/:issueId/preview',
            '/projects/:projectId/issues/:issueId/update',
            '/projects/:projectId/issues',
          ]}
          children={<IssuePage />}
        />
        <AuthRoute path="*">
          <ErrorPage />
        </AuthRoute>
      </Switch>
      <Footer />
      {showAlert && <Alert type={alert.type} message={alert.message} />}
    </Router>
  );
};

export default App;

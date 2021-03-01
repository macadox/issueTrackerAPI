import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import FormInput from '../components/FormInput';
import { useGlobalContext } from '../context';

const LoginPage = () => {
  const { login } = useGlobalContext();

  return (
    <main className="main main--form">
      <div className="form">
        <h2 className="form__heading">Log into your account</h2>
        <AuthForm className="form__body--login" callback={login}>
          <FormInput
            id="email"
            labelText="Email address"
            type="email"
            required
          />
          <FormInput
            id="password"
            labelText="Password"
            type="password"
            minLength="8"
            required
          />
          <div className="form__group">
            <button className="btn btn--big btn--dark form__button form__button--send">
              Login
            </button>
          </div>
        </AuthForm>
        <div className="form__footer">
          <Link to="/signup" className="form__link">
            Not a member? Click here to signup!
          </Link>
          <Link to="/forgotPassword" className="form__link">
            Forgot your password?
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

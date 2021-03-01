import React from 'react';
import AuthForm from '../components/AuthForm';
import FormInput from '../components/FormInput';
import { useGlobalContext } from '../context';

const ResetPasswordPage = () => {
  const { resetPassword } = useGlobalContext();

  return (
    <main className="main main--form">
      <div className="form">
        <h2 className="form__heading">Reset password</h2>
        <p className="form__description">
          Type your new password below to reset.
        </p>
        <p className="form__description">
          For security reasons, we do NOT store your password. So rest assured
          that we will never send your password via email.
        </p>
        <AuthForm callback={resetPassword} className="form__body--reset-password">
          <FormInput
            id="password"
            labelText="Password"
            type="password"
            minLength="8"
            required
          />
          <FormInput
            id="confirmPassword"
            labelText="Confirm password"
            type="confirmPassword"
            minLength="8"
            type="password"
            required
          />
          <div className="form__group">
            <button className="btn btn--big btn--dark form__button form__button--send">
              Reset password
            </button>
          </div>
        </AuthForm>
      </div>
    </main>
  );
};

export default ResetPasswordPage;

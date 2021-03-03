import React from 'react';
import AuthForm from '../components/AuthForm';
import FormInput from '../components/FormInput';
import FormSubmit from '../components/FormSubmit';
import { useGlobalContext } from '../context';
import { useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { resetPassword } = useGlobalContext();
  const { token } = useParams();

  const submitResetPassword = (body) => {
    resetPassword(body, token);
  };

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
        <AuthForm
          callback={submitResetPassword}
          className="form__body--reset-password"
        >
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
          <FormSubmit successValue="Password reset" defaultValue="Reset password" />
        </AuthForm>
      </div>
    </main>
  );
};

export default ResetPasswordPage;

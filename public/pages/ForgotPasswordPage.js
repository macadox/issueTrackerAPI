import React from 'react';
import AuthForm from '../components/AuthForm';
import FormInput from '../components/FormInput';
import FormSubmit from '../components/FormSubmit';
import { useGlobalContext } from '../context';

const ForgotPasswordPage = () => {
  const { sendPasswordReset } = useGlobalContext();

  return (
    <main className="main main--form">
      <div className="form">
        <h2 className="form__heading">Forgot password?</h2>
        <p className="form__description">
          Enter the email address you used when you joined and we’ll send you
          instructions to reset your password.
        </p>
        <p className="form__description">
          For security reasons, we do NOT store your password. So rest assured
          that we will never send your password via email.
        </p>
        <AuthForm
          callback={sendPasswordReset}
          className="form__body--forgot-password"
        >
          <FormInput
            id="email"
            labelText="Email address"
            type="email"
            required
          />
          <FormSubmit successValue="Instructions sent" defaultValue="Send reset instructions" />
        </AuthForm>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;

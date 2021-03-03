import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import FormInput from '../components/FormInput';
import FormSubmit from '../components/FormSubmit';
import { useGlobalContext } from '../context';

const SignupPage = () => {
  const { signup } = useGlobalContext();

  return (
    <main className="main main--form">
      <div className="form">
        <h2 className="form__heading">Create your account</h2>
        <AuthForm callback={signup} className="form__body--signup">
          <FormInput id="name" labelText="Full name" type="text" required />
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
          <FormInput
            id="confirmPassword"
            labelText="Confirm password"
            type="confirmPassword"
            type="password"
            minLength="8"
            required
          />
          <FormSubmit
            successValue="Sign up email sent"
            defaultValue="Sign up"
          />
        </AuthForm>
        <div className="form__footer">
          <Link to="/login" className="form__link">
            Already a member? Click here to login!
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;

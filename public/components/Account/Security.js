import React from 'react';
import AuthForm from '../AuthForm';
import FormInput from '../FormInput';
import FormSubmit from '../FormSubmit';

import { useGlobalContext } from '../../context';

const Security = () => {
  const { updatePassword } = useGlobalContext();

  return (
    <div className="form form--user">
      <h2 className="form__heading form__heading--bigger">
        Manage your password
      </h2>
      <AuthForm
        callback={updatePassword}
        className="form__body form__body--update-me"
      >
        <FormInput
          className="form__input--bigger"
          id="currentPassword"
          name="currentPassword"
          labelText="Current password"
          type="password"
          required
        />
        <FormInput
          id="password"
          name="password"
          labelText="New password"
          type="password"
          className="form__input--bigger"
          required
        />
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          labelText="Confirm password"
          type="password"
          className="form__input--bigger"
          required
        />
        <FormSubmit successValue="Data saved" defaultValue="Save" />
      </AuthForm>
    </div>
  );
};

export default Security;

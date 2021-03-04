import React from 'react';
import AuthForm from '../AuthForm';
import FormInput from '../FormInput';
import FormSubmit from '../FormSubmit';
import FormPhotoUpload from '../FormPhotoUpload';

import { useGlobalContext } from '../../context';

const UserProfile = () => {
  const { user } = useGlobalContext();
  return (
    <div className="form form--user">
      <h2 className="form__heading form__heading--bigger">
        Your account settings
      </h2>
      <AuthForm className="form__body form__body--update-me">
        <FormPhotoUpload user={user} />
        <FormInput
          className="form__input--bigger"
          id="name"
          name="name"
          labelText="Full name"
          type="text"
          value={user.name}
        />
        <FormInput
          id="email"
          name="email"
          labelText="Email address"
          type="email"
          className="form__input--bigger"
          value={user.email}
        />
        <FormInput
          id="organization"
          name="organization"
          labelText="Organization"
          type="text"
          className="form__input--bigger"
          value={user.organization}
        />
        <FormSubmit successValue="Data saved" defaultValue="Save" />
      </AuthForm>
    </div>
  );
};

export default UserProfile;

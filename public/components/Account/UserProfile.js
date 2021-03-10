import React, { useState, useEffect } from 'react';
import AuthForm from '../AuthForm';
import FormInput from '../FormInput';
import FormSubmit from '../FormSubmit';
import UserPhotoUpload from './UserPhotoUpload';

import { useGlobalContext } from '../../context';

const UserProfile = () => {
  const { user, updateDetails } = useGlobalContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setOrganization(user.organization || '');
    }
  }, [user]);

  return (
    <div className="form form--user">
      <h2 className="form__heading form__heading--bigger">
        Your account settings
      </h2>
      <AuthForm
        encType="multipart/form-data"
        className="form__body form__body--update-me"
        callback={updateDetails}
      >
        <UserPhotoUpload user={user} />
        <FormInput
          className="form__input--bigger"
          id="name"
          name="name"
          labelText="Full name"
          type="text"
          value={name}
        />
        <FormInput
          id="email"
          name="email"
          labelText="Email address"
          type="email"
          className="form__input--bigger"
          value={email}
        />
        <FormInput
          id="organization"
          name="organization"
          labelText="Organization"
          type="text"
          className="form__input--bigger"
          value={organization}
        />
        <FormSubmit successValue="Data saved" defaultValue="Save" />
      </AuthForm>
    </div>
  );
};

export default UserProfile;

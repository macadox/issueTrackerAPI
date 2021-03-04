import React from 'react';

const FormPhotoUpload = ({ user }) => {
  return (
    <div className="form__group form__photo-upload">
      <img
        src={`${window.location.protocol}//${window.location.hostname}:9000/assets/img/users/${user.photo}`}
        alt={user.name}
        className="form__user-photo"
      />
      <input type="file" accept="image/*" id="photo" className="form__upload" />
      <label htmlFor="photo" className="btn btn--small btn--dark">
        Choose a new photo
      </label>
    </div>
  );
};

export default FormPhotoUpload;

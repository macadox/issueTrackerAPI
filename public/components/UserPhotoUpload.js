import React, { useState, useEffect } from 'react';

const UserPhotoUpload = ({ user }) => {
  if (!user) {
    return null;
  }

  const { userPhoto, userName } = user || '';

  const [photo, setPhoto] = useState(userPhoto);
  const [name, setName] = useState(userName);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleChange = (files) => {
    setPhoto(URL.createObjectURL(files[0]));
    setFileUploaded(true);
  };

  useEffect(() => {
    const { photo, name } = user;
    setPhoto(photo);
    setName(name);
    setFileUploaded(false);
  }, [user]);

  return (
    <div className="form__group form__photo-upload">
      {photo && (
        <img
          src={
            !fileUploaded
              ? `${window.location.origin}/assets/img/users/${photo}`
              : photo
          }
          alt={name}
          className="form__user-photo"
        />
      )}
      <input
        onChange={(e) => handleChange(e.target.files)}
        type="file"
        accept="image/*"
        id="photo"
        name="photo"
        className="form__upload"
      />
      <label htmlFor="photo" className="btn btn--small btn--dark">
        Choose a new photo
      </label>
    </div>
  );
};

export default UserPhotoUpload;

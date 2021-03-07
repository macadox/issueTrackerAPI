import React from 'react';

const AssigneeList = ({ max, users }) => {
  const shownUsers = users.length > max ? users.slice(0, max) : users;
  const rest = users.length > max ? users.length - max : null;

  return (
    <div className="team-members">
      {shownUsers.map((user) => {
        const { name, photo, id } = user;
        return (
          <img
            key={id}
            src={`${window.location.origin}/assets/img/users/${photo}`}
            alt={name}
            className="team-members__user-icon--list"
          />
        );
      })}
      {rest && (
        <span className="team-members__rest-text">and {rest} others</span>
      )}
    </div>
  );
};

export default AssigneeList;

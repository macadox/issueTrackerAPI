import React from 'react';

const ListHead = ({ children }) => {
  return (
    <thead>
      <tr className="list__row--heading">{children}</tr>
    </thead>
  );
};

export default ListHead;

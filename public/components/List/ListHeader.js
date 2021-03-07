import React from 'react';

const ListHeader = ({ title, sortable, ...props }) => {
  return (
    <th className="list__heading">
      <span>{title}</span>
    </th>
  );
};

export default ListHeader;

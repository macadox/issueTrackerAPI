import React from 'react';

const List = ({ children, ...props }) => {
  return (
    <table className="list" {...props}>
      {children}
    </table>
  );
};

export default List;

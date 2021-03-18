import React from 'react';

const Grid = ({ className, children }) => {
  return <div className={`grid ${className ? className : ''}`}>{children}</div>;
};

export default Grid;

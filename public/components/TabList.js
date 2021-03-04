import React from 'react';

const Tablist = ({ labelledBy, children, ...props }) => {
  return (
    <div
      className="tabs__tablist-container"
      {...props}
    >
      <div className="tabs__tablist" aria-labelledby={labelledBy}>
        {children}
      </div>
    </div>
  );
};

export default Tablist;

import React from 'react';

const TabButton = ({ active, label, ...props }) => {
  return (
    <button
      className={`tabs__tab ${active ? 'tabs__tab--active' : ''}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default TabButton;

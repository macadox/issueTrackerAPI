import React from 'react';

const TabPanel = ({ active, children, ...props }) => {
  return (
    <div
      className={`tabs__tabpanel ${active ? 'tabs__tabpanel--active' : ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default TabPanel;

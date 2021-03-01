import React from 'react';

const Menu = ({ children }) => {
  return (
    <ul className="menu" role="menu">
      {children}
    </ul>
  );
};

export default Menu;

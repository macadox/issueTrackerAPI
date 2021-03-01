import React from 'react';
import { Link } from 'react-router-dom';

const MenuLink = ({ link }) => {
  const { id, text, img, url } = link;
  return (
    <li className="menu__item">
      <Link to={url} className="menu__link">
        {/* TODO: Active page */}
        <img src={img} alt={text} className={`menu__icon menu__icon--${text.toLowerCase().replace(' ', '')}`} role="menuitem" />
        <span className="menu__text">{text}</span>
      </Link>
    </li>
  );
};

export default MenuLink;

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const MenuLink = ({ link }) => {
  const { id, text, img, url, test } = link;
  const [active, setActive] = useState(false);

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      setActive(test.test(location.pathname));
    });
  }, [history]);

  useEffect(() => {
    setActive(test.test(location.hash.slice(1)));
  }, []);

  return (
    <li className="menu__item">
      <Link
        to={url}
        className={`menu__link ${active ? 'menu__link--active' : ''}`}
      >
        <img
          src={img}
          alt={text}
          className={`menu__icon menu__icon--${text
            .toLowerCase()
            .replace(' ', '')}`}
          role="menuitem"
        />
        <span className="menu__text">{text}</span>
      </Link>
    </li>
  );
};

export default MenuLink;

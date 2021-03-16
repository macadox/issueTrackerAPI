import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import MenuLink from './MenuLink';

import links from './data';
import Login from 'url:../../assets/img/ui/login.svg';

import { useGlobalContext } from '../../context';

const Header = () => {
  const { user, logout } = useGlobalContext();
  return (
    <header>
      <Logo user={user} />
      <nav>
        <Menu>
          {links.map((link) => {
            if (link.private && !user) return;
            else if (
              (user && link.auth) ||
              (user &&
                link.restrictTo &&
                !user.roles.some((role) => link.restrictTo.includes(role)))
            )
              return;
            else {
              return <MenuLink key={link.id} link={link} />;
            }
          })}
          {user && (
            <li className="menu__item" role="menuitem">
              <button
                onClick={logout}
                className="btn menu__link menu__link--logout"
              >
                <img
                  src={Login}
                  alt="logout"
                  className="menu__icon menu__icon--logout"
                />
                <span className="menu__text">Logout</span>
              </button>
            </li>
          )}
        </Menu>
      </nav>
    </header>
  );
};

export default Header;

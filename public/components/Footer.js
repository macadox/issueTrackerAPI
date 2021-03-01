import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { id: 1, url: '/', text: 'About us' },
  { id: 2, url: '/', text: 'Download apps' },
  { id: 3, url: '/', text: 'Terms of Service' },
  { id: 4, url: '/', text: 'Privacy Policy' },
  { id: 5, url: '/', text: 'Careers' },
  { id: 6, url: '/', text: 'Contact' },
];

const Footer = () => {
  return (
    <footer>
      <p className="footer__copy">IssueTracker &copy; Maciej Okniński, 2021 </p>
      <ul className="footer__menu">
        {footerLinks.map((link) => {
          const { id, text, url } = link;

          return (
            <li key={id}>
              <Link to={url}>{text}</Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;

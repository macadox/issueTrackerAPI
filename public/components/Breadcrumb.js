import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ crumbs }) => {
  return (
    <div className="breadcrumb-container">
      <ol className="breadcrumb">
        {crumbs.map((c, i) => {
          const { url, label } = c;
          return (
            <li className="breadcrumb__item" key={i}>
              {i !== crumbs.length - 1 ? (
                <Link className="breadcrumb__link" to={url}>
                  {label}
                </Link>
              ) : (
                <span className="breadcrumb__link">{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumb;

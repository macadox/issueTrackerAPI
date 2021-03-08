import React from 'react';

const SearchBar = ({ label, controls, ...props }) => {
  return (
    <input
      type="serch"
      aria-label={label}
      placeholder={label}
      aria-controls={controls}
      className="search-input"
      {...props}
    />
  );
};

export default SearchBar;

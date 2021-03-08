import React from 'react';
import { FaSortAmountUpAlt, FaSortAmountDownAlt } from 'react-icons/fa';

const ListHeader = ({ title, sortKey, onClick, sort, ...props }) => {
  const sorted = sort && sortKey === sort.slice(1);
  let ascending;
  if (sorted) {
    ascending = sort.slice(0, 1) === '+' ? true : false;
  }

  const handleClick = (sortKey) => {
    if (onClick) {
      onClick(sortKey);
    }
  };
  return (
    <th
      className="list__heading"
      tabIndex={0}
      aria-sort={
        ascending === undefined
          ? 'none'
          : ascending === true
          ? 'ascending'
          : 'descending'
      }
    >
      <span onClick={() => handleClick(sortKey)}>
        {title}
        {ascending === undefined ? (
          ''
        ) : ascending === true ? (
          <FaSortAmountUpAlt className="list__heading-icon" />
        ) : (
          <FaSortAmountDownAlt className="list__heading-icon" />
        )}
      </span>
    </th>
  );
};

export default ListHeader;

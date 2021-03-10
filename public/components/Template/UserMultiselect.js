import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { FaTimes } from 'react-icons/fa';

const UserMultiselect = ({ inputKey, inputValue, labelText }) => {
  const [selectedValues, setSelectedValues] = useState(inputValue);
  const { data: resource, loading } = useFetch(
    `${window.location.origin}/api/v1/users?limit=50`
  );
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(selectedValues);
  console.log(resource, loading);

  //   useEffect(() => {
  //     setSelectedValues(inputValue);
  //   }, [inputValue]);

  const handleClick = () => {};

  const handleKeyDown = (e) => {
    e.preventDefault();

    // backspace
    if (e.keyCode == 8) {
      e.preventDefault();
      if (this.chosenContainer.children.length == 0) return;
      this.removeValue(
        this.chosenContainer.children[this.chosenContainer.children.length - 1]
      );
      this.focusFirst();
    } // arrowup
    else if (e.keyCode == 38) {
      e.preventDefault();
      if (this.dropdown.children.length == 0) return;
      if (this.active == 0) return;
      else this.active--;
    } // arrowdown
    else if (e.keyCode == 40) {
      e.preventDefault();
      if (this.dropdown.children.length == 0) return;
      if (this.active == this.dropdown.children.length - 1) return;
      else this.active++;
    } // space enter
    else if (e.keyCode == 13 || e.keyCode == 32) {
      e.preventDefault();
      if (this.dropdown.children.length == 0) return;
      this.selectValue(this.dropdown.children[this.active]);
      this.focusFirst();
    }
  };

  const dropdownValues = resource.filter(
    (v) => !selectedValues.map((s) => s._id).includes(v._id)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-template__field">
      <label htmlFor={inputKey} className="form-template__label">
        {labelText}
      </label>
      <div
        id={inputKey}
        role="listbox"
        aria-multiselectable="true"
        className="chosen-container"
        tabIndex="0"
        aria-activedescendant={dropdownValues[activeIndex]._id}
      >
        <ul className="chosen chosen--edit">
          {selectedValues.map((v, i) => {
            const { _id, mainRole, name } = v;
            const userLabel =
              name +
              ` (${mainRole
                .charAt(0)
                .toUpperCase()
                .concat(mainRole.slice(1))})`;
            return (
              <li
                key={_id}
                id={_id}
                className="chosen__choice chosen__choice--edit"
                role="option"
              >
                <span className="chosen__value">{userLabel}</span>
                <button className="chosen__button">
                  <FaTimes />
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="dropdown">
          {dropdownValues.map((u, i) => {
            const { _id, mainRole, name } = u;
            const userLabel =
              name +
              ` (${mainRole
                .charAt(0)
                .toUpperCase()
                .concat(mainRole.slice(1))})`;
            return (
              <li
                className={`dropdown__option ${
                  i === activeIndex ? 'dropdown__option--focused' : ''
                }`}
                role="option"
                key={_id}
                id={_id}
              >
                <span className="dropdown__value">{userLabel}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserMultiselect;

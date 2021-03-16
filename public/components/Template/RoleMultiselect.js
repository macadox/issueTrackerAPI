import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const RoleMultiselect = ({
  inputKey,
  inputValue,
  labelText,
  mode,
  update,
  className,
  resource,
  onUpdate,
}) => {
  const [selectedValues, setSelectedValues] = useState(inputValue || []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const multiselectRef = useRef(null);

  useEffect(() => {
    update(inputKey, selectedValues);
    onUpdate(selectedValues);
  }, [selectedValues]);

  const dropdownValues = resource.filter((v) => !selectedValues.includes(v));

  const addValue = (idx) => {
    const value = dropdownValues[idx];
    const newSelectedValues = [...selectedValues, value];
    setSelectedValues(newSelectedValues);
  };

  const removeValue = (idx) => {
    const newSelectedValues = [...selectedValues].filter((v, i) => i !== idx);
    setSelectedValues(newSelectedValues);
  };

  const handleKeyDown = (e) => {
    // backspace
    if (e.keyCode === 8) {
      e.preventDefault();
      if (selectedValues.length === 0) return;
      removeValue(selectedValues.length - 1);
      setActiveIndex(0);
    } // arrowup
    else if (e.keyCode === 38) {
      e.preventDefault();
      if (dropdownValues.length === 0) return;
      if (activeIndex === 0) return;
      setActiveIndex(activeIndex - 1);
    } // arrowdown
    else if (e.keyCode === 40) {
      e.preventDefault();
      if (dropdownValues.length === 0) return;
      if (activeIndex === dropdownValues.length - 1) return;
      else setActiveIndex(activeIndex + 1);
    } // space enter
    else if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      if (dropdownValues.length === 0) return;
      addValue(activeIndex);
      setActiveIndex(0);
    }
  };

  if (mode === 'preview') {
    return (
      <div className={`form-template__field ${className ? className : ''}`}>
        {labelText && (
          <label htmlFor={inputKey} className="form-template__label">
            {labelText}
          </label>
        )}
        <ul className="chosen">
          {selectedValues.map((v, i) => {
            return (
              <li key={v} className="chosen__choice chosen__choice--read">
                <span className="chosen__value">{v}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // if (mode === 'create' || mode === 'update')
  return (
    <div className={`form-template__field ${className ? className : ''}`}>
      {labelText && (
        <label htmlFor={inputKey} className="form-template__label">
          {labelText}
        </label>
      )}
      <div
        id={inputKey}
        role="combobox"
        className="chosen-container"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        aria-activedescendant={
          dropdownValues[activeIndex] && dropdownValues[activeIndex].id
        }
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setIsDropdownOpen(false)}
        aria-expanded={isDropdownOpen}
        ref={multiselectRef}
      >
        <ul className="chosen chosen--edit">
          {selectedValues.map((v, i) => {
            return (
              <li
                key={v}
                id={v}
                className="chosen__choice chosen__choice--edit"
              >
                <span className="chosen__value">{v}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeValue(i);
                    setActiveIndex(0);
                    multiselectRef.current.focus();
                  }}
                  tabIndex={-1}
                  className="chosen__button"
                  aria-label="remove item"
                >
                  <FaTimes />
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="dropdown" role="listbox">
          {dropdownValues.map((u, i) => {
            return (
              <li
                className={`dropdown__option ${
                  i === activeIndex ? 'dropdown__option--focused' : ''
                }`}
                role="option"
                key={u}
                id={u}
                onClick={() => {
                  addValue(i);
                }}
                aria-selected={i === activeIndex}
              >
                <span className="dropdown__value">{u}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RoleMultiselect;

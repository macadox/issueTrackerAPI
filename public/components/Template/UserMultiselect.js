import React, { useState, useEffect, useRef } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { FaTimes } from 'react-icons/fa';

const UserMultiselect = ({
  inputKey,
  inputValue,
  labelText,
  mode,
  update,
  className,
}) => {
  const [selectedValues, setSelectedValues] = useState(inputValue || []);
  const { data: resource, loading } = useFetch(
    `${window.location.origin}/api/v1/users?limit=50`
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const multiselectRef = useRef(null);

  useEffect(() => {
    update(
      inputKey,
      selectedValues.map((u) => u._id)
    );
  }, [selectedValues, loading]);

  const dropdownValues = resource.filter(
    (v) => !selectedValues.map((s) => s._id).includes(v._id)
  );

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

  if (loading) {
    return <div>Loading...</div>;
  }

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
            const { _id, mainRole, name } = v;
            const userLabel =
              name +
              ` (${mainRole
                .charAt(0)
                .toUpperCase()
                .concat(mainRole.slice(1))})`;
            return (
              <li key={_id} className="chosen__choice chosen__choice--read">
                <span className="chosen__value">{userLabel}</span>
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
        role="listbox"
        aria-multiselectable="true"
        className="chosen-container"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        aria-activedescendant={
          dropdownValues[activeIndex] && dropdownValues[activeIndex]._id
        }
        ref={multiselectRef}
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeValue(i);
                    setActiveIndex(0);
                    multiselectRef.current.focus();
                  }}
                  tabIndex={-1}
                  className="chosen__button"
                >
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
                onClick={() => {
                  addValue(i);
                }}
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

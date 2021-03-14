import React, { useState, useEffect } from 'react';

import TemplateImmutable from './TemplateImmutable';
import TemplateTextarea from './TemplateTextarea';
import TemplateCheckbox from './TemplateCheckbox';

const AcceptanceCriterias = ({
  inputKey,
  inputValue,
  labelText,
  mode,
  update,
  className,
}) => {
  const [selectedValues, setSelectedValues] = useState(inputValue || []);

  useEffect(() => {
    update(inputKey, selectedValues);
  }, [selectedValues]);

  const updateAC = (key, value, index) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index][key] = value;
    setSelectedValues(newSelectedValues);
  };

  const addNewAC = () => {
    const newSelectedValues = [
      ...selectedValues,
      { solved: false, criterion: '' },
    ];
    setSelectedValues(newSelectedValues);
  };

  const removeAC = (index) => {
    const newSelectedValues = selectedValues.filter((v, i) => i !== index);
    setSelectedValues(newSelectedValues);
  };

  if (mode === 'preview') {
    return (
      <div className={`form-template__field ${className ? className : ''}`}>
        <label className="form-template__label" htmlFor={inputKey}>
          {labelText}
        </label>
        <table className="list">
          <thead>
            <tr className="list__row list__row--form list__row--heading">
              <th className="list__heading">
                <span>Criterion</span>
              </th>
              <th className="list__heading">
                <span>Created on</span>
              </th>
              <th className="list__heading">
                <span>Solved</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedValues.map((ac, i) => {
              const { _id, solved, createdOn, criterion } = ac;
              return (
                <tr className="list__row list__row--form" key={_id}>
                  <td className="list__data list__data--form">
                    <span>{criterion}</span>
                  </td>
                  <td className="list__data list__data--form">
                    {createdOn && (
                      <span>
                        {new Intl.DateTimeFormat('en-GB').format(
                          new Date(createdOn)
                        )}
                      </span>
                    )}
                  </td>
                  <td className="list__data list__data--form">
                    <span>{solved ? 'true' : 'false'}</span>
                  </td>
                  <td className="list__data list__data--form list__data--delete"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // if (mode === 'create' || mode === 'update')
  return (
    <div className={`form-template__field ${className ? className : ''}`}>
      <label className="form-template__label" htmlFor={inputKey}>
        {labelText}
      </label>

      <table className="list">
        <thead>
          <tr className="list__row list__row--form list__row--heading">
            <th className="list__heading">
              <span>Criterion</span>
            </th>
            <th className="list__heading">
              <span>Created on</span>
            </th>
            <th className="list__heading">
              <span>Solved</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedValues.map((ac, i) => {
            const { _id, solved, createdOn, criterion } = ac;
            return (
              <tr className="list__row list__row--form" key={_id || i}>
                <td className="list__data list__data--form">
                  <TemplateTextarea
                    inputValue={criterion}
                    inputKey="criterion"
                    update={(_, __) => updateAC(_, __, i)}
                  />
                </td>
                <td className="list__data list__data--form">
                  {createdOn && (
                    <TemplateImmutable
                      inputValue={new Intl.DateTimeFormat('en-GB').format(
                        new Date(createdOn)
                      )}
                      inputKey="createdOn"
                    />
                  )}
                </td>
                <td className="list__data list__data--form">
                  <TemplateCheckbox
                    inputValue={solved}
                    inputKey="solved"
                    update={(_, __) => updateAC(_, __, i)}
                  />
                </td>
                {!_id && (
                  <td className="list__data list__data--form list__data--delete">
                    <button
                      type="button"
                      className="btn btn--small btn--light"
                      onClick={() => removeAC(i)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn--small btn--light align--left btn--ac"
        onClick={addNewAC}
      >
        Add new criteria
      </button>
    </div>
  );
};

export default AcceptanceCriterias;

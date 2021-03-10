import '../../css/FormTemplate.css';
import React, { useState, useEffect } from 'react';

const editableDataReducer = (accum, current) => {
  accum[current] = null;
  return accum;
};

const Template = ({ mode, data, editableFields, children, ...props }) => {

  const [editableData, setEditableData] = useState(
    editableFields.reduce(editableDataReducer, {})
  );
  console.log(editableData);

  useEffect(() => {
    if (data) {
      const responseData = Object.entries(data).reduce(
        (accum, [key, value]) => {
          if (editableFields.includes(key)) {
            accum[key] = value;
          }
          return accum;
        },
        {}
      );
      setEditableData({ ...editableData, ...responseData });
    }
  }, [data]);

  const update = (key, value) => {
    const newData = { ...editableData };
    newData[key] = value;

    setEditableData(newData);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { mode, update });
    }
    return child;
  });

  return (
    <form className="form-template form-template--grid" {...props}>
      {childrenWithProps}
    </form>
  );
};

export default Template;

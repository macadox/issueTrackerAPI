import '../../css/FormTemplate.css';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';

const editableDataReducer = (accum, current) => {
  const { key, defaultVal } = current;
  accum[key] = defaultVal;
  return accum;
};

const Template = ({
  mode,
  data,
  editableFields,
  children,
  endpoint,
  saveRedirect,
  deleteRedirect,
  ...props
}) => {
  const [editableData, setEditableData] = useState(
    editableFields.reduce(editableDataReducer, {})
  );
  const { dispatchErrorAlert, dispatchAlertAndRedirectTo } = useGlobalContext();

  useEffect(() => {
    if (data) {
      const mappedEditableFields = editableFields.map((field) => field.key);
      const responseData = Object.entries(data).reduce(
        (accum, [key, value]) => {
          if (mappedEditableFields.includes(key)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.id === 'deleteFormButton') {
      deleteForm();
    } else {
      updateForm();
    }
  };

  const updateForm = async () => {
    fetch(`${endpoint}${mode === 'create' ? '' : `/${data.id}`}`, {
      method: mode === 'create' ? 'POST' : 'PATCH',
      body: JSON.stringify(editableData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error' || data.status === 'fail') {
          dispatchErrorAlert(data.message);
        } else {
          dispatchAlertAndRedirectTo(data, saveRedirect);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      })
      .catch((err) => dispatchErrorAlert(err));
  };

  const deleteForm = async () => {
    fetch(`${endpoint}/${data.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error' || data.status === 'fail') {
          dispatchErrorAlert(data.message);
        } else {
          dispatchAlertAndRedirectTo(data, deleteRedirect);
        }
      })
      .catch((err) => dispatchErrorAlert(err));
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { mode, update });
    }
    return child;
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="form-template form-template--grid"
      {...props}
    >
      {childrenWithProps}
    </form>
  );
};

export default Template;

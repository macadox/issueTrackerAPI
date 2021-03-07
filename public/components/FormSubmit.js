import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const FormSubmit = ({ defaultValue, isSubmitting, className, ...props }) => {
  return (
    <div className="form__group">
      <button
        className="btn btn--big btn--dark form__button form__button--send"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ScaleLoader
            height={18}
            width={2}
            radius={1}
            margin={2}
            color="#f2f2f2"
          />
        ) : (
          defaultValue
        )}
      </button>
    </div>
  );
};

export default FormSubmit;

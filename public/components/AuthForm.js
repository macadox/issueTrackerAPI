import React, { useState, useEffect, useRef } from 'react';

const AuthForm = ({ className, callback, children }) => {
  const formRef = useRef(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitSuccess) {
      setIsSubmitting(true);
      const formData = new FormData(formRef.current);
      callback(formData)
        .then((status) => {
          if (isMounted && status === 'success') {
            setIsSubmitSuccess(true);
            setIsSubmitting(false);
          } else {
            setIsSubmitSuccess(false);
            setIsSubmitting(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setIsSubmitting(false);
        });
    }
  };

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }

    return () => {
      setIsMounted(false);
    };
  }, []);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isSubmitSuccess, isSubmitting });
    }
    return child;
  });

  return (
    <form
      ref={formRef}
      className={`form__body ${className}`}
      onSubmit={handleSubmit}
    >
      {childrenWithProps}
    </form>
  );
};

export default AuthForm;

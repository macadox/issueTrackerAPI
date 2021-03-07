import React, { useState, useEffect, useRef } from 'react';

const AuthForm = ({ className, callback, children, ...props }) => {
  const formRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(formRef.current);
    callback(formData)
      .then((status) => {
        if (isMounted && status === 'success') {
          setIsSubmitting(false);
        } else {
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
      });
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
      return React.cloneElement(child, { isSubmitting });
    }
    return child;
  });

  return (
    <form
      ref={formRef}
      className={`form__body ${className}`}
      onSubmit={handleSubmit}
      {...props}
    >
      {childrenWithProps}
    </form>
  );
};

export default AuthForm;

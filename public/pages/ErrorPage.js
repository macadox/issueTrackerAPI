import React from 'react';

const ErrorPage = () => {
  return (
    <main className="main">
      <div className="wrapper-app">
        <div className="error">
          <div className="error__title">
            <h2 className="heading-secondary headng-secondary--error">
              Something went wrong!
            </h2>
            <p className="error__message">Some error message</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;

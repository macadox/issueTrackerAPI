import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Loader = () => {
  return (
    <div className="loader-container">
      <ScaleLoader
        height={36}
        width={4}
        radius={2}
        margin={2}
        color="#4f5b77"
      />
    </div>
  );
};

export default Loader;

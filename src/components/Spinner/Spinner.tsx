import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;

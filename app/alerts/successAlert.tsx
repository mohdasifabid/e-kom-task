import React from "react";

const SuccessAlert = ({ message }: { message: string | "" }) => {
  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded  z-20 fixed right-10 top-5"
      role="alert"
    >
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline"> {message}</span>
    </div>
  );
};

export default SuccessAlert;

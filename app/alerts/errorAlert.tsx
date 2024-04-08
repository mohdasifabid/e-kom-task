import React from "react";

const ErrorAlert = ({ message }: { message: string | "" }) => {
  
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded  z-20 fixed right-10 top-5"
      role="alert"
    >
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {message}</span>
    </div>
  );
};

export default ErrorAlert;

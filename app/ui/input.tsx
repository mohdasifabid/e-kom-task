"use client";

import { useState } from "react";
import { InputPropsType } from "../lib/definitions";

export const Input = (props: InputPropsType) => {
  const { placeholder, label, type, setter, validate } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  const handleChange = (value: string) => {
    setter(value);
    if (validate) {
      const errorMessage = validate(value);
      setError(errorMessage);
    }
  };
  return (
    <div className="w-456 h-48">
      <p className="font-400">{label}</p>
      <div className="relative">
        <input
          onChange={(e) => handleChange(e.target.value)}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-456 h-58 p-2  focus:outline-none border-2 border-gray-400 rounded-md"
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute top-3 right-4 underline"
            onClick={handlePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
        {error && <p className="text-red-500 text-sm mt-1 pl-1">{error}</p>}
      </div>
    </div>
  );
};

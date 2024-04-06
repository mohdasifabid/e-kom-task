import { useState, useRef, ChangeEvent } from "react";

const OtpInput: React.FC = () => {

  const [otpValues, setOtpValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(7).fill(null)
  );

  const handleInputChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      const newOtpValues = [...otpValues];

      if (index > 0) {
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex gap-5">
      {otpValues.map((value, index) => (
        <input
          key={index}
          className="w-46 h-48 border border-gray-400 rounded-md text-2xl text-center"
          maxLength={1}
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default OtpInput;

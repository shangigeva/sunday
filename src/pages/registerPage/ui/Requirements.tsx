import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckIcon from "@mui/icons-material/Check";

interface Requirement {
  regex: RegExp;
  index: number;
}

const Requirements: React.FC<{
  passwordRef: React.RefObject<HTMLInputElement>;
}> = ({ passwordRef }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const requirements: Requirement[] = [
    { regex: /(?=(.*\d){4})/, index: 0 },
    { regex: /(?=.*[a-z])/, index: 1 },
    { regex: /(?=.*[A-Z])/, index: 2 },
    { regex: /(?=.*[!@#$%^&*-])/, index: 3 },
    { regex: /.{8,}/, index: 4 },
  ];

  useEffect(() => {
    const passwordInput = passwordRef.current;

    if (passwordInput) {
      const handleKeyUp = () => {
        setIsFocused(true);
      };

      const handleBlur = () => {
        setIsFocused(false);
      };

      const handleInput = () => {
        setInputValue(passwordRef.current?.value || "");
      };

      passwordInput.addEventListener("keyup", handleKeyUp);
      passwordInput.addEventListener("blur", handleBlur);
      passwordInput.addEventListener("input", handleInput);

      return () => {
        passwordInput.removeEventListener("keyup", handleKeyUp);
        passwordInput.removeEventListener("blur", handleBlur);
        passwordInput.removeEventListener("input", handleInput);
      };
    }
  }, [passwordRef]);

  return (
    <div className="space-y-2">
      {isFocused &&
        requirements.map((item) => (
          <div
            key={item.index}
            id={`Requirement${item.index}`}
            className="p-1 rounded-md text-center flex items-center text-sm text-gray-500"
          >
            {item.regex.test(inputValue) ? (
              <CheckIcon fontSize="small" />
            ) : (
              <FiberManualRecordIcon fontSize="small" />
            )}
            <span className="ml-1">
              {item.index === 0 && "Must contain at least 4 numbers (0-9)"}
              {item.index === 1 &&
                "Must contain at least one lowercase letter (a-z)"}
              {item.index === 2 &&
                "Must contain at least one uppercase letter (A-Z)"}
              {item.index === 3 &&
                "Must contain at least one special character (!@#$%^&*-)"}
              {item.index === 4 && "Must be at least 8 characters long"}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Requirements;

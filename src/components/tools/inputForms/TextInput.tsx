import React, { ChangeEvent } from "react";

interface IsProps {
  id: number | string;
  type: "text" | "email" | "password" | "date" | "time" | "number";
  label: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
}

const TextInput: React.FC<IsProps> = ({
  type,
  label,
  value,
  onChange = () => "",
  inputClassName,
  labelClassName,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label
        className={`block text-sm font-medium text-black ${
          labelClassName || ""
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => (disabled ? "" : onChange(e))}
        className={`mt-1 p-2 border rounded-sm w-full ${inputClassName || ""}`}
      />
    </div>
  );
};

export default TextInput;

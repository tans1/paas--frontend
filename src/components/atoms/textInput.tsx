import React from "react";

interface TextInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  togglePasswordVisibility?: () => void;
  name: string;
  "data-testid"?: string;

}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  togglePasswordVisibility,
  name,
  "data-testid": testId,
}) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <input
        type={type}
        name={name} // Added name attribute
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-md border ${error ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 ${togglePasswordVisibility ? "pr-12" : ""
          }`}
        data-testid={testId}
      />
      {togglePasswordVisibility && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-3 flex items-center text-gray-600"
        >
          {type === "password" ? "Show" : "Hide"}
        </button>
      )}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default TextInput;

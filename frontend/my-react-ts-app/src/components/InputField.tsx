import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  multiline = false,
  required = false,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={name} className="input-label">
        {label}
        <span className={required ? "required-label" : "optional-label"}>
          {required ? " (必須)" : " (任意)"}
        </span>
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="input-box"
          rows={6}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="input-box"
        />
      )}
    </div>
  );
};

export default InputField;

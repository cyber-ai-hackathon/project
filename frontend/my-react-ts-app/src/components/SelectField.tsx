import React from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={name} className="input-label">
        {label}
        <span className="optional-label"> (選択式)</span>
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="input-box"
      >
        <option value="">選択してください</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

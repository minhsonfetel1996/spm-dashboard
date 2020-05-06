import React from "react";
import "./input.styles.css";

const Input = ({
  id,
  name,
  label,
  type,
  value,
  error,
  onChange,
  focus,
  placeholder,
  rows,
  classes,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`form-control ${classes}`}
        rows={rows}
        autoFocus={focus}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

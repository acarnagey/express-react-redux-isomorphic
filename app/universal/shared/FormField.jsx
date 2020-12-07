import React from "react";

export default function FormField({ input, meta, label, type = "text" }) {
  const { touched, invalid, error } = meta;
  return (
    <div className="pure-control-group">
      <label htmlFor={input.name}>{label}</label>
      <input type={type} {...input} autoComplete="off" />
      {touched && invalid && (
        <span className="pure-form-message" style={{ color: "red" }}>
          {error}
        </span>
      )}
    </div>
  );
}

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const InputField = ({type, label, value, onChange, valid, focus, blur, placeholder, instruction }) => {
  return (
    <div>
      <label htmlFor={label}>
        {label}:
        <FontAwesomeIcon icon={faCheck} className={valid ? "valid" : "hide"} />
        <FontAwesomeIcon icon={faTimes} className={valid || !value ? "hide" : "invalid"} />
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
        value={value}
        required
        aria-invalid={valid ? "false" : "true"}
        aria-describedby={`${label}note`}
        onFocus={focus}
        onBlur={blur}
      />
      <p id={`${label}note`} className={focus && value && !valid ? "instructions" : "offscreen"}>
        <FontAwesomeIcon icon={faInfoCircle} />
        {instruction}
      </p>
    </div>
  );
};

export default InputField;

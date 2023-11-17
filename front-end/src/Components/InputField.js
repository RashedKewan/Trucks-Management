import { MDBInput } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
const InputField = ({
  type,
  label,
  value,
  onChange,
  valid,
  focus,
  blur,
  placeholder,
  instruction,
  allowInstructionMessages = true,
}) => {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <MDBInput
          wrapperClass="me-2  mr-2"
          type={type}
          id={label}
          label={label}
          value={value}
          onChange={onChange}
          valid={valid ? "true" : undefined}
          aria-describedby={`${label}note`}
          onFocus={focus}
          onBlur={blur}
        />
        {allowInstructionMessages ? (
          <label htmlFor={label} className="me-2" style={{ width: "1px" }}>
            <FontAwesomeIcon
              icon={faCheck}
              className={valid ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={valid || !value ? "hide" : "invalid"}
            />
          </label>
        ):undefined}
      </div>
      {allowInstructionMessages && focus && !valid && value?(
        <p
          style={{ width: "90%" }}
          id={`${label}note`}
          className={`${
            focus && value && !valid ? "instructions" : "offscreen"
          }  m-2`}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          {instruction}
        </p>
       ):undefined}
    </div>
  );
};

export default InputField;

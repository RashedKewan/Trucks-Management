import React from "react";

import { Alert } from "@mui/material";
const AlertComponent = ({ message, severity }) => {
  return (
    <div className="">
      <Alert  severity={severity}>
        {message}
      </Alert>
    </div>
  );
};

export default AlertComponent;

export const TIME_TO_RESEND_EMAIL_AGAIN = 5_000;

export const API_ENDPOINTS = {
  LOGIN: "/api/v1/auth/authenticate",
  LOGOUT: "api/v1/auth/logout",
  REGISTER: "/api/v1/auth/register",
  CONFIRMATION: "/api/v1/auth/confirm",
  RESEND_EMAIL: "/api/v1/auth/resend-email",
  REFRESH: "/api/v1/auth/refresh-token",
};

export const ROUTE_PATHS = {
  LOGIN: "/login",
  REGISTER: "/register",
  UNAUTHORIZED: "/unauthorized",
  REGISTER_SUCCESS: "/register-success",
  VERIFICATION_SUCCESS: "/verification-success",
  VERIFICATION_FAILED: "/verification-failed",
  VERIFICATION: "/verification",
  VERIFYING: "/verifying",
  DASHBOARD: "/", // Assuming your Dashboard route is at the root
};

export const REGEX = {
  USERNAME: /^[A-z0-9-_]{3,23}$/,
  NAME: /^[A-z\u05D0-\u05EA]{3,23}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  COMPANY_NAME: /^[\u05D0-\u05EAA-Za-z0-9\s\.,'-]+$/,
  CITY: /^[\u05D0-\u05EAA-Za-z\s'-]+$/,
};

export const ERROR_CODES = {
  UNAUTHORIZED: 401, // Unauthorized
  FORBIDDEN: 403, // Forbidden
  Username_Taken: 409, // username already taken
  ACCOUNT_NOT_ENABLED: 410, // Account Not Enabled
  VERIFICATION_FAILED: 5000, // Verification Failed
  ALREADY_VERIFIED: 5001, // Already Verified
  Email_Taken: 5100, // email already taken
  EMAIL_FAILED_TO_SEND: 5101, // Email Failed to Send
  SERVER_ERROR: 5050, // Indicates a general server error during registration
};

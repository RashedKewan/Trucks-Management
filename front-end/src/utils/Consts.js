export const TIME_TO_RESEND_EMAIL_AGAIN = 60_000;
export const TIME_TO_DIPLAY_MESSAGE = 10_000;

export const API_ENDPOINTS = {
  LOGIN:                  "/api/v1/auth/authenticate",
  LOGOUT:                 "api/v1/auth/logout",
  REGISTER:               "/api/v1/auth/register",
  CONFIRMATION:           "/api/v1/auth/confirm",
  RESEND_EMAIL:           "/api/v1/auth/resend-email",
  REFRESH:                "/api/v1/auth/refresh-token",
  RESET_PASSWORD:         "/api/v1/auth/reset-password",
  CHANGE_PASSWORD:        "/api/v1/auth/change-password",
  RESET_PASSWORD_REQUEST: "/api/v1/auth/reset-password-request",
};




// Just for App.js file
export const APP_ROUTE_PATHS = {
  HOME:                               "/",
  LoginPage:                          "login",
  RegisterPage:                       "register",
  RegisterSuccessPage:                "register-success",

  EmailVerificationResetPasswordPage: "verify-email-reset-password", 
  EmailVerificationNewAccountPage:    "verify-email-new-account",
  EmailVerificationCompletePage:      "verify-email-complete",
  EmailVerificationSuccessPage:       "verify-email-success",
  EmailVerificationFailedPage:        "verify-email-failed",
  EmailVerificationResendPage:        "resend-email",

  ResetPasswordPage:                  "reset-password",
  ResetPasswordRequestPage:           "reset-password-request",
  ResetPasswordRequestSuccessPage:    "reset-password-request-success"// need to translate
}

// Used in general
export const ROUTE_PATHS = {
  Home:                               `${APP_ROUTE_PATHS.HOME}`,
  LoginPage:                          `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.LoginPage}`,
  RegisterPage:                       `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.RegisterPage}`,
  RegisterSuccessPage:                `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.RegisterSuccessPage}`,

  EmailVerificationResetPasswordPage: `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.EmailVerificationResetPasswordPage}`,
  EmailVerificationNewAccountPage:    `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.EmailVerificationNewAccountPage}`,
  EmailVerificationCompletePage:      `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.EmailVerificationCompletePage}`,
  EmailVerificationSuccessPage:       `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.EmailVerificationSuccessPage}`,
  EmailVerificationFailedPage:        `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.EmailVerificationFailedPage}`,
  EmailVerificationResendPage:        `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.EmailVerificationResendPage}`   ,

  ResetPasswordPage:                  `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.ResetPasswordPage}`,
  ResetPasswordRequestPage:           `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.ResetPasswordRequestPage}`,
  ResetPasswordRequestSuccessPage:    `${APP_ROUTE_PATHS.HOME}${APP_ROUTE_PATHS.ResetPasswordRequestSuccessPage}`
}

export const REGEX = {
  USERNAME:     /^[A-z0-9-_]{3,23}$/,
  NAME:         /^[A-z\u05D0-\u05EA]{3,23}$/,
  PASSWORD:     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  EMAIL:        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  COMPANY_NAME: /^[\u05D0-\u05EAA-Za-z0-9\s\.,'-]+$/,
  CITY:         /^[\u05D0-\u05EAA-Za-z\s'-]+$/,
};

export const ERROR_CODES = {
  UNAUTHORIZED:                             401, // Unauthorized
  FORBIDDEN:                                403, // Forbidden
  Username_Taken:                           409, // username already taken
  ACCOUNT_NOT_ENABLED:                      410, // Account Not Enabled
  VERIFICATION_FAILED:                      5000, // Verification Failed
  ALREADY_VERIFIED:                         5001, // Already Verified
  Email_Taken:                              5100, // email already taken
  EMAIL_FAILED_TO_SEND:                     5101, // Email Failed to Send
  SERVER_ERROR:                             5050, // Indicates a general server error during registration
  RESET_PASSWORD_INCORRECT_USERNAME_ERROR:  5200,
  USER_DOES__NOT_EXIST_ERROR:               5201
};



export const Verification_STATUS ={
  SUCCESS:           "SUCCESS", 
  FAIL:              "FAIL", 
  ALREADY_VERIFIED:  "ALREADY_VERIFIED",
};
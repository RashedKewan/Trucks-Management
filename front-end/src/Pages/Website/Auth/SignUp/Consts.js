  export const USER_REGEX = /^[A-z0-9-_]{3,23}$/;
  export const NAME_REGEX = /^[A-z\u05D0-\u05EA]{3,23}$/;
  export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  export const COMPANY_NAME_REGEX = /^[\u05D0-\u05EAA-Za-z0-9\s\.,'-]+$/;
  export const CITY_REGEX = /^[\u05D0-\u05EAA-Za-z\s'-]+$/;
  
  export const REGISTER_URL = "/api/v1/auth/register";
export const instructionMessages = {
    username:
      "Must start with a letter. Should be 3 to 23 characters in length. Allowed characters: letters (uppercase or lowercase), numbers, underscores, and hyphens.",
    password:
      "Must be 8 to 24 characters in length. Must include at least one lowercase letter, one uppercase letter, one digit (0-9), and one special character (!, @, #, $, or %).",
    firstname:
      "Should be 3 to 23 characters in length. Allowed characters: letters (uppercase or lowercase) only.",
    lastname:
      "Should be 3 to 23 characters in length. Allowed characters: letters (uppercase or lowercase) only.",
    email:
      "Must have the format 'name@example.com'. Allowed characters: letters (uppercase or lowercase), numbers, dots, underscores, and hyphens. The domain part should have at least one dot and end with 2 to 4 alphabetic characters (e.g., '.com', '.org', '.io').",
    company:
      "Allowed characters: letters (uppercase or lowercase), numbers, spaces, periods, commas, hyphens, and apostrophes. Company name may include special characters such as commas and periods.",
    city: "Allowed characters: letters (uppercase or lowercase), spaces, hyphens, and apostrophes. City names may include spaces and common punctuation characters.",
    confirmPassword: "Must match the first password input field.",
  };
  
  export const USER_REGEX = /^[A-z0-9-_]{3,23}$/;
  export const NAME_REGEX = /^[A-z\u05D0-\u05EA]{3,23}$/;
  export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  export const COMPANY_NAME_REGEX = /^[\u05D0-\u05EAA-Za-z0-9\s\.,'-]+$/;
  export const CITY_REGEX = /^[\u05D0-\u05EAA-Za-z\s'-]+$/;
  
  export const REGISTER_URL = "/api/v1/auth/register";
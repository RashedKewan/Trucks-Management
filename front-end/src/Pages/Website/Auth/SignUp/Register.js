import { UserRole } from "../../../../Models/User/UserRole";
import UserSignUp from "../../../../Models/User/UserSignUp";
import InputField from "../../../../Components/InputField";
import useInput from "../../../../Hooks/useFormInput";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "../../../../Lib/axios";
import "../style.css";
import { useTranslation } from "react-i18next";
import {
  API_ENDPOINTS,
  ERROR_CODES,
  REGEX,
  ROUTE_PATHS,
} from "../../../../utils/Consts";

const Register = () => {
  /**************************** CONSTS *******************************/
  const username = useInput("", REGEX.USERNAME);
  const password = useInput("", REGEX.PASSWORD);
  const firstname = useInput("", REGEX.NAME);
  const lastname = useInput("", REGEX.NAME);
  const email = useInput("", REGEX.EMAIL);
  const company = useInput("", REGEX.COMPANY_NAME);
  const city = useInput("", REGEX.CITY);
  const confirmPassword = useInput("", REGEX.PASSWORD);

  const { t } = useTranslation();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  // Get Navigator
  const navigateTo = useNavigate();

  const instructionMessages = {
    username: t("instructionMessages.username"),
    password: t("instructionMessages.password"),
    firstname: t("instructionMessages.firstname"),
    lastname: t("instructionMessages.lastname"),
    email: t("instructionMessages.email"),
    company: t("instructionMessages.company"),
    city: t("instructionMessages.city"),
    confirmPassword: t("instructionMessages.confirmPassword"),
  };

  /**************************** FUNCTIONS *******************************/
  /**
   * @function handleSubmit
   * @description
   * Handles the form submission for user registration.
   * Validates form fields, creates a new UserSignUp object, and makes a POST request to the registration endpoint.
   *
   * @param {Object} e - The event object from the form submission.
   * @returns {Promise<void>}
   *
   * @dependencies
   *  - React Hooks: useState.
   *  - React Router: useNavigate.
   *  - Axios: axios.post for making API requests.
   *  - Constants: API_ENDPOINTS for API endpoints, ROUTE_PATHS for route paths, ERROR_CODES for error codes.
   *  - Translation: t function for translating error messages.
   *
   * @throws {string} errMsg - Displays an error message if the form submission fails.
   *
   * @usage
   *  - Ensure that form fields are valid.
   *  - Creates a new UserSignUp object with user details.
   *  - Sends a POST request to the registration endpoint.
   *  - Navigates to the registration success page on successful registration.
   *  - Handles various error cases, such as duplicate username or email.
   */
  const handleSubmit = async (e) => {
    try {
      // Prevent the default form submission behavior
      e.preventDefault();

      // Validate form fields
      if (
        !firstname.valid ||
        !lastname.valid ||
        !username.valid ||
        !email.valid ||
        !company.valid ||
        !city.valid ||
        !password.valid ||
        !confirmPassword.valid ||
        password.value !== confirmPassword.value
      ) {
        setErrMsg("Invalid Entry");
        return;
      }

      // Create a new UserSignUp object with user details
      let user = new UserSignUp(
        firstname.value,
        lastname.value,
        username.value,
        email.value,
        password.value,
        company.value,
        city.value,
        UserRole.USER
      );

      // Send a POST request to the registration endpoint
      const response = await axios.post(API_ENDPOINTS.REGISTER, user);

      // Navigate to the registration success page with the email in the state
      navigateTo(ROUTE_PATHS.REGISTER_SUCCESS, {
        state: { email: email.value },
      });
    } catch (err) {
      // Handle different error cases
      if (!err?.response) {
        setErrMsg(t("No_Server_Response"));
      } else if (err.response?.data === ERROR_CODES.Username_Taken) {
        setErrMsg(t("Username_Taken"));
      } else if (err.response?.data === ERROR_CODES.Email_Taken) {
        setErrMsg(t("Email_Taken"));
      } else if (err.response?.data === ERROR_CODES.SERVER_ERROR) {
        setErrMsg(t("Registration_Failed"));
      }
    }
  };

  /**************************** RETURN *******************************/
  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={handleSubmit}>
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>{t("Register")}</h1>
            <InputField
              type="text"
              label={t("Firstname")}
              value={firstname.value}
              onChange={firstname.handleChange}
              valid={firstname.valid}
              focus={firstname.handleFocus}
              blur={firstname.handleBlur}
              placeholder="Ex: John"
              instruction={instructionMessages.firstname}
            />
            <InputField
              type="text"
              label={t("Lastname")}
              value={lastname.value}
              onChange={lastname.handleChange}
              valid={lastname.valid}
              focus={lastname.handleFocus}
              blur={lastname.handleBlur}
              placeholder="Ex: Doe"
              instruction={instructionMessages.lastname}
            />
            <InputField
              type="text"
              label={t("Username")}
              value={username.value}
              onChange={username.handleChange}
              valid={username.valid}
              focus={username.handleFocus}
              blur={username.handleBlur}
              placeholder="Choose a unique username"
              instruction={instructionMessages.username}
            />
            <InputField
              type="email"
              label={t("Email")}
              value={email.value}
              onChange={email.handleChange}
              valid={email.valid}
              focus={email.handleFocus}
              blur={email.handleBlur}
              placeholder="yourname@example.com"
              instruction={instructionMessages.email}
            />
            <InputField
              type="text"
              label={t("Company")}
              value={company.value}
              onChange={company.handleChange}
              valid={company.valid}
              focus={company.handleFocus}
              blur={company.handleBlur}
              placeholder="Ex: ABC Co. Ltd"
              instruction={instructionMessages.company}
            />
            <InputField
              type="text"
              label={t("City")}
              value={city.value}
              onChange={city.handleChange}
              valid={city.valid}
              focus={city.handleFocus}
              blur={city.handleBlur}
              placeholder="Ex: Tamra"
              instruction={instructionMessages.city}
            />
            <InputField
              type="password"
              label={t("Password")}
              value={password.value}
              onChange={password.handleChange}
              valid={password.valid}
              focus={password.handleFocus}
              blur={password.handleBlur}
              placeholder="Create a strong password"
              instruction={instructionMessages.password}
            />
            <InputField
              type="password"
              label={t("Confirm_Password")}
              value={confirmPassword.value}
              onChange={confirmPassword.handleChange}
              valid={confirmPassword.valid}
              focus={confirmPassword.handleFocus}
              blur={confirmPassword.handleBlur}
              placeholder="Re-enter your password"
              instruction={instructionMessages.confirmPassword}
            />
            <button
              className="mt-4"
              disabled={
                !firstname.valid ||
                !lastname.valid ||
                !username.valid ||
                !email.valid ||
                !company.valid ||
                !city.valid ||
                !password.valid ||
                !confirmPassword.valid ||
                password.value !== confirmPassword.value
                  ? true
                  : false
              }
            >
              {t("Sign_Up")}
            </button>

            <p className="m-2">
              {t("Already_Registered")}?{" "}
              <span className="line">
                <Link to={ROUTE_PATHS.LOGIN}>{t("Login")}</Link>
              </span>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useContext, useEffect, useRef, useState } from "react";
import InputField from "../../../../Components/InputField";
import UserLogin from "../../../../Models/User/UserLogin";

import useInput from "../../../../Hooks/useFormInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "../../Context/UserContext";
import { useTranslation } from "react-i18next";
import axios from "../../../../Lib/axios";
import Cookies from "universal-cookie";
import cookies from "js-cookie";
import "../style.css";
import {
  API_ENDPOINTS,
  ERROR_CODES,
  REGEX,
  ROUTE_PATHS,
} from "../../../../utils/Consts";
import RegisterPage from "../Register/RegisterPage";

const LoginForm = () => {
  /**************************** CONSTS *******************************/
  /**
   * @state
   * @description Manages success and error messages displayed on top of the login form.
   *
   * @messages
   *  - successMsg: Displays success messages related to the login process.
   *  - errMsg: Displays error messages related to the login process.
   *
   * @location
   *  - Represents the location object from React Router, used to get parameters passed from other pages.
   *
   * @inputs
   *  - username: Manages the state of the username input field with validation using the provided regex.
   *  - password: Manages the state of the password input field with validation using the provided regex.
   *
   * @context
   *  - userContext: Represents the user context obtained from the User context provider.
   *
   * @navigation
   *  - navigateTo: Function from React Router used for navigation.
   *
   * @i18n
   *  - t: Translation function from the useTranslation hook to translate words based on the selected language.
   *  - currentLanguageCode: Stores the current language code obtained from cookies. Defaults to "he" if not found.
   *
   * @cookie
   *  - cookie: Instance of "universal-cookie" used to store JWT token.
   *
   * @instructionMessages
   *  - Object containing translated instruction messages for username and password validation.
   *
   * @dependencies
   *  - React Hooks: useState, useRef, useContext, useLocation, useNavigate, useTranslation.
   *  - External Libraries: universal-cookie, js-cookie.
   *
   * @returns {void}
   */
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const location = useLocation();
  const username = useInput("", REGEX.USERNAME);
  const password = useInput("", REGEX.PASSWORD);
  const userContext = useContext(User);
  const navigateTo = useNavigate();
  const { t } = useTranslation();
  const cookie = new Cookies();
  const currentLanguageCode = cookies.get("i18next") || "he";
  const instructionMessages = {
    username: t("instructionMessages.Invalid_Username"),
    password: t("instructionMessages.Invalid_Password"),
  };

  /**************************** FUNCTIONS *******************************/
  /**
   * @function useEffect
   * @description Handles side effects related to the Login page, specifically for logout and language translation.
   *
   * @sideEffects
   *  - Checks if the page is rendered after a logout operation, indicated by the 'logout' key in the state.
   *  - Displays a suitable success message if the logout operation is detected.
   *  - Resets the success message if no logout operation is detected.
   *  - Listens for changes in the current language code (@currentLanguageCode) and translation function (@t).
   *  - Translates the web content to the selected language whenever the language changes.
   *
   * @dependencies
   *  - Relies on React's useEffect hook.
   *
   * @returns {void}
   */
  useEffect(() => {
    // Check if the page is rendered after a logout operation
    const logoutStatus = location.state && location.state.logout;

    // Display a suitable success message if a logout operation is detected
    if (logoutStatus === true) {
      setSuccessMsg(t("Logout_Successful"));
    } else {
      // Reset the success message if no logout operation is detected
      setSuccessMsg("");
    }
  }, [currentLanguageCode, t, location.state]);

  /**
   * @function Submit
   * @description Handles the form submission for user login.
   *
   * @param {Event} event - The form submission event.
   * @returns {Promise<void>} - A promise that resolves after the submission process.
   *
   * @sideEffects
   *  - Prevents the default form submission behavior.
   *  - Validates the username and password fields.
   *  - Sends a login request to the server using the provided credentials.
   *  - Sets authentication tokens and user details in context on successful login.
   *  - Redirects to the dashboard page.
   *
   * @errorHandling
   *  - Displays an error message if there is no response from the server.
   *  - Handles Forbidden (403) and Unauthorized (401) status codes with specific error messages.
   *  - Displays an error message if the account is not enabled (status code 410).
   *  - Displays a general error message for other error cases.
   */
  const Submit = async (event) => {
    try {
      setSuccessMsg("");
      setErrMsg("");
      // Prevent default form submission behavior
      event.preventDefault();

      // Validate username and password
      if (!password.valid || !username.valid) {
        return;
      }

      // Create a new UserLogin instance with provided credentials
      const user = new UserLogin(username.value, password.value);

      // Send a login request to the server
      const res = await axios.post(API_ENDPOINTS.LOGIN, user);

      // Extract tokens and user details from the response
      const access_token = res.data.access_token;
      const refresh_token = res.data.refresh_token;
      const userDetails = res.data.userDetails;

      // Set authentication tokens and user details in context
      cookie.set("Bearer", access_token);
      userContext.setAuth({
        access_token,
        refresh_token,
        userDetails,
      });

      // Redirect to the dashboard page on successful login
      navigateTo(ROUTE_PATHS.Home);
    } catch (err) {
      // Handle different error scenarios
      if (!err?.response) {
        setErrMsg(t("No_Server_Response"));
      } else if (
        err.response.status === ERROR_CODES.FORBIDDEN ||
        err.response.status === ERROR_CODES.UNAUTHORIZED
      ) {
        setErrMsg(t("Wrong_Credentials"));
      } else if (err.response.data === ERROR_CODES.ACCOUNT_NOT_ENABLED) {
        setErrMsg(t("Account_Not_Enabled"));
      } else {
        setErrMsg(t("Registration_Failed"));
      }
    }
  };

  /**************************** RETURN *******************************/
  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={Submit}>
          <section>
            <p
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <p
              className={successMsg ? "successmsg" : "offscreen"}
              aria-live="assertive"
            >
              {successMsg}
            </p>
            <h1>{t("Login")}</h1>
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
              allowInstructionMessages={false}
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
              allowInstructionMessages={false}
            />

            <button
              type="submit"
              className="mt-4"
              disabled={!username.valid || !password.valid ? true : false}
            >
              {t("Login")}
            </button>

            <p className="mt-2">
              {t("Forgot")}{" "}
              <a href={ROUTE_PATHS.ResetPasswordRequestPage}>{t("Password")}? </a>
              <Link to={ROUTE_PATHS.RegisterPage}>{t("Sign_Up")}</Link>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import { useState, useRef, useContext } from "react";
import axios from "../../../../Lib/axios";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import useInput from "../../../../Hooks/useFormInput";
import InputField from "../../../../Components/InputField";
import { UserRole } from "../../../../Models/User/UserRole";
import { User } from "../../Context/UserContext";
import UserSignUp from "../../../../Models/User/UserSignUp";
import Cookies from "universal-cookie";
import {
  CITY_REGEX,
  COMPANY_NAME_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  PWD_REGEX,
  REGISTER_URL,
  USER_REGEX,
  instructionMessages,
} from "./Consts";

const Register = () => {
  /**************************** CONSTS *******************************/
  const username = useInput("", USER_REGEX);
  const password = useInput("", PWD_REGEX);
  const firstname = useInput("", NAME_REGEX);
  const lastname = useInput("", COMPANY_NAME_REGEX);
  const email = useInput("", EMAIL_REGEX);
  const company = useInput("", COMPANY_NAME_REGEX);
  const city = useInput("", CITY_REGEX);
  const confirmPassword = useInput("", PWD_REGEX);

  const errRef = useRef();

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // Get User Context
  const userContext = useContext(User);

  // Create Cookie
  const cookie = new Cookies();

  // Get Navigator
  const navigateTo = useNavigate();

  /**************************** FUNCTIONS *******************************/
  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
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
      const response = await axios.post(REGISTER_URL, user);
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      const userDetails = response.data.userDetails;
      cookie.set("Bearer", access_token);
      userContext.setAuth({
        access_token,
        refresh_token,
        userDetails,
      });

      setSuccess(true);
      username.handleChange({ target: { value: "" } });
      password.handleChange({ target: { value: "" } });
      confirmPassword.handleChange({ target: { value: "" } });
      navigateTo("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={handleSubmit}>
          {success ? (
            <section>
              <h1>Success!</h1>
              <p>
                <a href="/">Sign In</a>
              </p>
            </section>
          ) : (
            <section>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Register</h1>
              <InputField
                type="text"
                label="Firstname"
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
                label="Lastname"
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
                label="Username"
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
                label="Email"
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
                label="Company"
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
                label="City"
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
                label="Password"
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
                label="Confirm Password"
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
                Sign Up
              </button>

              <p className="m-2">
                Already registered?{" "}
                <span className="line">
                  <Link to="/login">Sign In</Link>
                </span>
              </p>
            </section>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useContext, useRef, useState } from "react";
import InputField from "../../../../Components/InputField";
import UserLogin from "../../../../Models/User/UserLogin";
import { PWD_REGEX, USER_REGEX } from "../SignUp/Consts";
import useInput from "../../../../Hooks/useFormInput";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../Context/UserContext";
import { useTranslation } from "react-i18next";
import axios from "../../../../Lib/axios";
import Cookies from "universal-cookie";
import "../style.css";

const LOGIN_URL = "/api/v1/auth/authenticate";

const LoginForm = () => {
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const username = useInput("", USER_REGEX);
  const password = useInput("", PWD_REGEX);
  const userContext = useContext(User);
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const cookie = new Cookies();
  const errRef = useRef();

  const instructionMessages = {
    username: t("instructionMessages.Invalid_Username"),
    password: t("instructionMessages.Invalid_Password"),

  };

  async function Submit(event) {
    event.preventDefault();

    if (!password.valid || !username.valid) {
      return;
    }

    try {
      let user = new UserLogin(username.value, password.value);
      let res = await axios.post(LOGIN_URL, user);

      console.log(res.data);
      const access_token = res.data.access_token;
      const refresh_token = res.data.refresh_token;
      const userDetails = res.data.userDetails;
      cookie.set("Bearer", access_token);
      userContext.setAuth({
        access_token,
        refresh_token,
        userDetails,
      });
      
      navigateTo("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (
        err.response.status === 403 || // Forbidden
        err.response.status === 401 // Unauthorized
      ) {
        setErrMsg("Wrong Credentials");
        setIsUnauthorized(true);
      } else {
        setErrMsg("Registration Failed");
      }
    }
  }

  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={Submit}>
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
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
              disabled={(!username.valid || !password.valid) ? true : false}
            >
              {t("Login")}
            </button>

            <p className="mt-2">
              {t("Forgot")} <a href="/">{t("Password")}? </a>
              <Link to="/register">{t("Sign_Up")}</Link>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

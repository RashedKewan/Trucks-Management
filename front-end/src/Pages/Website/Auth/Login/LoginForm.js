// import axios from "../../../../Lib/axios";
import axios from "../../../../Lib/axios";
import React, { useContext, useRef, useState } from "react";
import UserLogin from "../../../../Models/User/UserLogin";
import { User } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "../style.css";
import useInput from "../../../../Hooks/useFormInput";
import { PWD_REGEX, USER_REGEX } from "../SignUp/Consts";
import InputField from "../../../../Components/InputField";

const LoginForm = () => {
  const username = useInput("", USER_REGEX);
  const password = useInput("", PWD_REGEX);

  const errRef = useRef();
  // const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // Consts
  const userContext = useContext(User);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const LOGIN_URL = "/api/v1/auth/authenticate";
  const navigateTo = useNavigate();

  // cookie
  const cookie = new Cookies();

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
            <h1>Login</h1>
            <InputField
              type="text"
              label="Username"
              value={username.value}
              onChange={username.handleChange}
              valid={username.valid}
              focus={username.handleFocus}
              blur={username.handleBlur}
              placeholder="Choose a unique username"
              instruction="Invalid Username"
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
              instruction="Invalid Password"
            />

            <button
              type="submit"
              className="mt-4"
              disabled={!username.valid || !password.valid ? true : false}
            >
              Login
            </button>

            <p className="mt-2">
              Forgot <a href="/">Password? </a>
              <Link to="/register">Signup</Link>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

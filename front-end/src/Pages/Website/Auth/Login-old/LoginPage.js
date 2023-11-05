import * as React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { request, setAuthHeader } from "../../../../Lib/axios";

const LoginPage = () => {
 
  const [state, setState] = React.useState({
    active: "login",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });


  const onLogin = (e, username, password) => {
    e.preventDefault();
    request("POST", "/api/v1/auth/authenticate", {
      email: username,
      password: password,
    })
      .then((response) => {
        // added
        // Use the correct property name: userDTO
        setState({ userDTO: response.data });
        setAuthHeader(response.data.token);
        // Navigate to the "/messages" route
        localStorage.setItem("userDTO", JSON.stringify(response.data));
        window.location.href = "/messages";
      })
      .catch((error) => {
        setAuthHeader(null);
        window.location.href = "/login";
      });
  };

  const onRegister = (event, firstName, lastName, username, password) => {
    event.preventDefault();
    //request("POST", "/register", {
    request("POST", "/api/v1/auth/register", {
      firstname: firstName,
      lastname: lastName,
      email: username,
      password: password,
      role: "USER",
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        // Use the correct property name: userDTO
        setState({ userDTO: response.data });
        window.location.href = "/login";
      })
      .catch((error) => {
        setAuthHeader(null);
      });
  };

  // store the state of the updated values of the fields
  const onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setState({ [name]: value });
  };

  const onSubmitLogin = (e) => {
    onLogin(e, state.username, state.password);
  };

  const onSubmitRegister = (e) => {
    onRegister(
      e,
      state.firstName,
      state.lastName,
      state.username,
      state.password
    );
  };

  // render() {
  return (
    <div className="Login template d-flex justify-content-center align-items-center vh-100 bg-primary bckg-design">
      <div className="form_container p-5  rounded transparent-form bg-white">
        <ul
          className="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className={classNames(
                "nav-link",
                state.active === "login" ? "active" : ""
              )}
              id="tab-login"
              onClick={() => setState({ active: "login" })}
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={classNames(
                "nav-link",
                state.active === "register" ? "active" : ""
              )}
              id="tab-register"
              onClick={() => setState({ active: "register" })}
            >
              Register
            </button>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className={classNames(
              "tab-pane",
              "fade",
              state.active === "login" ? "show active" : ""
            )}
            id="pills-login"
          >
            <form onSubmit={onSubmitLogin}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="loginName">
                  Username
                </label>
                <input
                  type="text"
                  id="loginName"
                  name="username"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="loginPassword">
                  Password
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-2">
                <input
                  type="checkbox"
                  className="custom-control custom-checkbox"
                  id="check"
                />
                <label htmlFor="check" className="custom-input-label ms-2">
                  Remember me
                </label>
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign in
                </button>
              </div>
              <p className="text-end mt-2">
                Forgot <a href="">Password?</a>
                <Link
                  to="/login"
                  className={`ms-2 ${state.active === "login" ? "" : "active"}`}
                  onClick={() => setState({ active: "register" })}
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>

          <div
            className={classNames(
              "tab-pane",
              "fade",
              state.active === "register" ? "show active" : ""
            )}
            id="pills-register"
          >
            <form onSubmit={onSubmitRegister}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="firstName">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="lastName">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="login">
                  Username
                </label>
                <input
                  type="text"
                  id="login"
                  name="username"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerPassword">
                  Password
                </label>
                <input
                  type="password"
                  id="registerPassword"
                  name="password"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-3"
                >
                  Sign up
                </button>
              </div>
              <p className="text-end mt-2">
                Forgot <a href="">Password?</a>
                <Link
                  to="/login"
                  className={`ms-2 ${
                    state.active === "register" ? "" : "active"
                  }`}
                  onClick={() => setState({ active: "login" })}
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// import axios from "../../../../Lib/axios";
import axios from "axios";
import React, { useContext, useState } from "react";
import UserSignUp from "../../../../Models/User/UserSignUp";
import { UserRole } from "../../../../Models/User/UserRole";
import Input from "../../../../Components/Input";
import { isSignUpFormDataValid } from "./SignUpFormValidation";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../Context/UserContext";

const SignUpForm = () => {
  const userContext = useContext(User);
  const [accept, setAccept] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [user, setUser] = useState(
    new UserSignUp("", "", "", "", "", "", "", UserRole.USER)
  );
  const nav = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  async function Submit(event) {
    event.preventDefault();
    setAccept(true);

    if (!isSignUpFormDataValid(user, passwordRepeat)) {
      return;
    }

    try {
      let res = await axios.post(
        "http://localhost:8081/api/v1/auth/register",
        user
      );

      console.log(res.data);

      const token = res.data.access_token;
      const refresh_token = res.data.refresh_token;
      const userDetails = res.data.userDetails;
      userContext.setAuth({
        token,
        refresh_token,
        userDetails,
      });
      nav("/dashboard");
    } catch (err) {
      setAccept(true);
    }
  }
  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={Submit}>
          <Input
            label="Firstname"
            name="firstname"
            type="text"
            placeholder="Firstname..."
            value={user.firstname}
            onChange={handleChange}
            condition={user.firstname === "" && accept}
            requiredError="Firstname is required"
          />

          <Input
            label="Lastname"
            name="lastname"
            type="text"
            placeholder="Lastname..."
            value={user.lastname}
            onChange={handleChange}
            condition={user.firstname === "" && accept}
            requiredError="Lastname is required"
          />

          <Input
            label="Username"
            name="username"
            type="text"
            placeholder="Username..."
            value={user.username}
            onChange={handleChange}
            condition={user.username === "" && accept}
            requiredError="Username is required"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Email..."
            value={user.email}
            onChange={handleChange}
            condition={user.email === "" && accept}
            requiredError="Email is required"
          />

          <Input
            label="Company"
            name="company"
            type="text"
            placeholder="Company..."
            value={user.company}
            onChange={handleChange}
            condition={user.company === "" && accept}
            requiredError="Company is required"
          />

          <Input
            label="City"
            name="city"
            type="text"
            placeholder="City..."
            value={user.city}
            onChange={handleChange}
            condition={user.city === "" && accept}
            requiredError="City is required"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Password..."
            value={user.password}
            onChange={handleChange}
            condition={user.password.length < 8 && accept}
            requiredError="Password is required"
          />

          <Input
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            placeholder="Repeat Password..."
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            condition={passwordRepeat !== user.password && accept}
            requiredError="Repeat Password is required"
          />
          <div className="d-grid" style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-primary btn-block mb-3">
              Sign up
            </button>
            <p className="text-end">
              Forgot <a href="/">Password? </a>
              <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

// import axios from "../../../../Lib/axios";
import axios from "../../../../Lib/axios";
import React, { useContext, useState } from "react";
import UserSignUp from "../../../../Models/User/UserSignUp";
import { UserRole } from "../../../../Models/User/UserRole";
import Input from "../../../../Components/Input";
import { isSignUpFormDataValid } from "./SignUpFormValidation";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../Context/UserContext";
import Cookies from "universal-cookie";

const SignUpForm = () => {
  const userContext = useContext(User);
  const [accept, setAccept] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [user, setUser] = useState(
    new UserSignUp("", "", "", "", "", "", "", UserRole.USER)
  );
  const navigateTo = useNavigate();
  const REGISTER_URL = "/api/v1/auth/register";

  
  // cookie
  const cookie = new Cookies();


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

    if (!isSignUpFormDataValid(user, confirmedPassword)) {
      return;
    }

    try {
      let res = await axios.post(
        REGISTER_URL,
        user
      );

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
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password..."
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            condition={confirmedPassword !== user.password && accept}
            requiredError="Repeat Password is required"
          />
          <div className="d-grid" style={{ textAlign: "center" }}>
            <button  type="submit" className="btn btn-primary btn-block mb-3">
              Sign up
            </button>
            <div>
              <p>
                Already registered?{" "}  
                <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

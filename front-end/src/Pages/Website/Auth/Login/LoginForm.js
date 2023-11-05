// import axios from "../../../../Lib/axios";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserLogin from "../../../../Models/User/UserLogin";
import Input from "../../../../Components/Input";
import { User } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
const LoginForm = () => {
  // Consts
  const userContext = useContext(User);
  const [accept, setAccept] = useState(false);
  const [user, setUser] = useState(new UserLogin("", ""));
  const nav = useNavigate();

  // Functions
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

    if (user.password.length < 8 || user.username === "") {
      return;
    }

    try {
      let res = await axios.post(
        "http://localhost:8081/api/v1/auth/authenticate",
        user
      );

      console.log(res.data);

      const access_token = res.data.access_token;
      const refresh_token = res.data.refresh_token;
      const userDetails = res.data.userDetails;
      userContext.setAuth({
        access_token,
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
            label="Password"
            name="password"
            type="password"
            placeholder="Password..."
            value={user.password}
            onChange={handleChange}
            condition={user.password.length < 8 && accept}
            requiredError="Password is required"
          />
          <div className="d-grid" style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-primary btn-block mb-3">
              Login
            </button>
          </div>
          <p className="text-end mt-2">
            Forgot <a href="/">Password? </a>
            <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
import React, { useContext } from "react";
import { User } from "../Website/Context/UserContext";
import axios from "../../Lib/axios";
import Cookies from "universal-cookie";
import {useNavigate } from "react-router-dom";

const LOGOUT_URL = "api/v1/auth/logout";

const Dashboard = () => {
  const userContext = useContext(User);
  console.log(userContext.auth.userDetails.firstname);
  const name = userContext.auth.userDetails.firstname;
  const cookie = new Cookies();
  const token = cookie.get("Bearer");


  const navigateTo = useNavigate();

  async function logout(event) {
    try {
      const res = await axios.post(LOGOUT_URL, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      cookie.remove("Bearer");
      console.log(res);
      navigateTo("/login");
    } catch (err) {}
  };

  return (
    <>
      <div>
        <button id="submit" onClick={logout}>Logout</button>
      </div>
      <div>
        <h1>Dashboard</h1>
        <h3>Current User Name: {name}</h3>
      </div>
    </>
  );
};

export default Dashboard;

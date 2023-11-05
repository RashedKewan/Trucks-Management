import React, { useContext } from "react";
import { User } from "../Website/Context/UserContext";

const Dashboard = () => {
  const userContext = useContext(User);
  console.log(userContext.auth.userDetails.firstname);
  const name = userContext.auth.userDetails.firstname;
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Current User Name: {name}</h3>
    </div>
  );
};

export default Dashboard;

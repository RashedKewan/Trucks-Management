import { useContext, useState } from "react";
import { User } from "../../Context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const user = useContext(User);
  const location = useLocation();
  const [jwt, setJwt] = useState(user.auth.access_token);

  console.log("RequireAuth: ", user.auth.userDetails);
  console.log("RequireAuth: ", jwt);

  
  return user.auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}

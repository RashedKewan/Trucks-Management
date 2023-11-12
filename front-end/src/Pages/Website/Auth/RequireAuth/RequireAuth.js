import { useContext } from "react";
import { User } from "../../Context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "../../../../utils/Consts";
/**
 * @component RequireAuth
 * @description
 * A route guard component to ensure that the user is authenticated before accessing protected routes.
 * Uses React context and React Router's Navigate component for redirection.
 *
 * @dependencies
 *  - React Hooks: useContext.
 *  - React Router: useLocation, Navigate.
 *  - Context: User context for user authentication details.
 *  - Constants: ROUTE_PATHS for route paths.
 *
 * @returns {JSX.Element}
 *  - If the user is authenticated:
 *    - Outlet: Renders the nested child components of the protected route.
 *  - If the user is not authenticated:
 *    - Navigate: Redirects the user to the login page with the original location in the state.
 */
export default function RequireAuth() {
  // Access user authentication details from context
  const user = useContext(User);
  
  // Get the current location from React Router
  const location = useLocation();

  // Render protected content if the user is authenticated, otherwise redirect to login
  return user.auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={ROUTE_PATHS.LOGIN} />
  );
}

import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../../Context/UserContext";
import axios from "../../../../Lib/axios";
import Cookies from "universal-cookie";
import Loading from "../../../../Components/Loading";
import { API_ENDPOINTS } from "../../../../utils/Consts";
/**
 * @component PersistLogin
 * @description
 * Manages user authentication persistence by automatically refreshing the access token
 * when the page is refreshed. Checks for the presence of a valid access token and, if
 * absent, attempts to refresh it using the refresh token stored in cookies.
 *
 * @context
 *  - userContext: Represents the user context obtained from the User context provider.
 *
 * @state
 *  - loading: Manages the loading state, indicating whether the refresh operation is in progress.
 *
 * @dependencies
 *  - React Hooks: useState, useEffect, useContext.
 *  - External Libraries: axios, universal-cookie.
 *
 * @returns {JSX.Element}
 *  - Loading: Displays a loading spinner while the refresh operation is in progress.
 *  - Outlet: Renders the child components when the refresh operation is complete.
 */
export default function PersistLogin() {
  const userContext = useContext(User);
  const [loading, setLoading] = useState(true);
  const token = userContext.auth.access_token;
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  let refreshInProgress = false;

  useEffect(() => {
    async function refresh() {
      if (refreshInProgress) return;

      refreshInProgress = true;
      try {
        setLoading(true);
        // Attempt to refresh the access token using the refresh token
        await axios
          .post(API_ENDPOINTS.REFRESH, null, {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          })
          .then((data) => {
            // Update the access token and user details in the context and cookies
            cookie.set("Bearer", data.data.access_token);
            userContext.setAuth((prev) => {
              return {
                userDetails: data.data.userDetails,
                access_token: data.data.access_token,
              };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        refreshInProgress = false;
      }
    }

    // Trigger the refresh operation if there is no valid access token
    !token ? refresh() : setLoading(false);
  }, []);

  // Render the loading spinner while the refresh operation is in progress, or render the child components
  return loading ? <Loading /> : <Outlet />;
}

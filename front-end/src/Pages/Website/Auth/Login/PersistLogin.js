import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../../Context/UserContext";
import axios from "../../../../Lib/axios";
import Cookies from "universal-cookie";
import Loading from "../../../../Components/Loading";

// works whenever we apply refresh to page
export default function PersistLogin() {
  // get current user
  const userContext = useContext(User);
  const [loading, setLoading] = useState(true);
  const token = userContext.auth.access_token;

  const REFRESH_URL = "/api/v1/auth/refresh-token";
  // cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  let refreshInProgress = false;
  useEffect(() => {
    async function refresh() {
      if (refreshInProgress) return;

      refreshInProgress = true;
      try {
        setLoading(true);
        await axios
          .post(REFRESH_URL, null, {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          })
          .then((data) => {
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

    !token ? refresh() : setLoading(false);
  }, []);

  return loading ? <Loading /> : <Outlet />;
}

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Website/Auth/Login/LoginPage";
import SignUpPage from "./Pages/Website/Auth/SignUp/SignUpPage";
import Dashboard from "./Pages/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import RequireAuth from "./Pages/Website/Auth/RequireAuth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/Login/PersistLogin";
import PageNotFound from "./Pages/Website/Auth/Missing/PageNotFound";
import UnauthorizedPage from "./Pages/Website/Auth/Unauthorized/UnaothorizedPage";
import { UserRole } from "./Models/User/UserRole";
import Layout from "./Pages/Website/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<SignUpPage />}></Route>
          <Route path="unauthorized" element={<UnauthorizedPage />}></Route>

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[UserRole.USER]} />}>
              <Route path="/" element={<Dashboard />}></Route>
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

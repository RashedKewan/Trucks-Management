import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Website/Auth/Login/LoginPage";

import Dashboard from "./Pages/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import RequireAuth from "./Pages/Website/Auth/RequireAuth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/Login/PersistLogin";
import UnauthorizedPage from "./Pages/Website/Auth/Unauthorized/UnaothorizedPage";
import { UserRole } from "./Models/User/UserRole";
import Layout from "./Pages/Website/Layout/Layout";

import NotFoundPage from "./Pages/Website/Auth/Missing/NotFoundPage";
import EmailVerificationCompletePage from "./Pages/Website/Auth/Register/EmailVerificationCompletePage";
import EmailVerificationSuccessPage from "./Pages/Website/Auth/Register/EmailVerificationSuccessPage";
import EmailVerificationFailedPage from "./Pages/Website/Auth/Register/EmailVerificationFailedPage";
import EmailVerificationNewAccountPage from "./Pages/Website/Auth/Register/EmailVerificationNewAccountPage";
import EmailVerificationResetPasswordPage from "./Pages/Website/Auth/Register/EmailVerificationResetPasswordPage";
import ResetPasswordSendRequestSuccessPage from "./Pages/Website/Auth/Register/ResetPasswordSendRequestSuccessPage";
import ResetPasswordSendRequestPage from "./Pages/Website/Auth/Register/ResetPasswordSendRequestPage"
import ResetPasswordPage from "./Pages/Website/Auth/Register/ResetPasswordPage";
import EmailVerificationNewAccountResendEmailPage from "./Pages/Website/Auth/Register/EmailVerificationNewAccountResendEmailPage";
import { APP_ROUTE_PATHS } from "./utils/Consts";
import RegisterSuccessPage from "./Pages/Website/Auth/Register/RegisterSuccessPage";
import RegisterPage from "./Pages/Website/Auth/Register/RegisterPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          
          {/* Auth */}
          <Route path={APP_ROUTE_PATHS.LoginPage}                             element={<LoginPage />} />
          <Route path={APP_ROUTE_PATHS.RegisterPage}                          element={<RegisterPage/>} />
          <Route path={APP_ROUTE_PATHS.RegisterSuccessPage}                   element={<RegisterSuccessPage />} />
          
          {/* Verification */}
          <Route path={APP_ROUTE_PATHS.EmailVerificationResetPasswordPage}    element={<EmailVerificationResetPasswordPage />} />
          <Route path={APP_ROUTE_PATHS.EmailVerificationNewAccountPage}       element={<EmailVerificationNewAccountPage />} />
          <Route path={APP_ROUTE_PATHS.EmailVerificationCompletePage}         element={<EmailVerificationCompletePage />} />
          <Route path={APP_ROUTE_PATHS.EmailVerificationSuccessPage}          element={<EmailVerificationSuccessPage />} />
          <Route path={APP_ROUTE_PATHS.EmailVerificationFailedPage}           element={<EmailVerificationFailedPage />} />
          <Route path={APP_ROUTE_PATHS.EmailVerificationResendPage}           element={<EmailVerificationNewAccountResendEmailPage />} />
          
          {/* Password Reset */}
          <Route path={APP_ROUTE_PATHS.ResetPasswordPage}                     element={<ResetPasswordPage />} />
          <Route path={APP_ROUTE_PATHS.ResetPasswordRequestPage}              element={<ResetPasswordSendRequestPage />} />
          <Route path={APP_ROUTE_PATHS.ResetPasswordRequestSuccessPage}       element={<ResetPasswordSendRequestSuccessPage />} />
          
          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[UserRole.USER]} />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Route>


          {/* Errors */}
          {/* catch all */}
          <Route path="*" element={<NotFoundPage />} />
          <Route path="unauthorized" element={<UnauthorizedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

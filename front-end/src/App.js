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
// import Test from "./Pages/Test/test";
import SignupSuccess from "./Pages/Website/Auth/SignUp/SignupSuccess";
import VerificationSuccess from "./Pages/Website/Auth/SignUp/VerificationSuccess";
import AlreadyVerified from "./Pages/Website/Auth/SignUp/AlreadyVerified";
import VerificationFailed from "./Pages/Website/Auth/SignUp/VerificationFailed";
import ResendEmail from "./Pages/Website/Auth/SignUp/ResendEmail";
import ResetPassword from "./Pages/Website/Auth/SignUp/ResetPassword";
import PasswordResetRequestPage from "./Pages/Website/Auth/SignUp/PasswordResetRequestPage";
import PasswordResetRequestSuccessPage from "./Pages/Website/Auth/SignUp/PasswordResetRequestSuccessPage";
import ResetPasswordEmailVerifyingPage from "./Pages/Website/Auth/SignUp/ResetPasswordEmailVerifyingPage";
import NewAccountEmailVerifyingPage from "./Pages/Website/Auth/SignUp/NewAccountEmailVerifyingPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<SignUpPage />}></Route>
          <Route path="unauthorized" element={<UnauthorizedPage />}></Route>
          <Route path="register-success" element={<SignupSuccess />}></Route>
          <Route path="verification-success" element={<VerificationSuccess />}></Route>
          <Route path="verification-failed" element={<VerificationFailed />}></Route>
          <Route path="verification" element={<AlreadyVerified />}></Route>
          <Route path="reset-password-email-verifying" element={<ResetPasswordEmailVerifyingPage />}></Route>
          <Route path="new-account-email-verifying" element={<NewAccountEmailVerifyingPage />}></Route>
          <Route path="resend-email" element={<ResendEmail />}></Route>
          <Route path="reset-password" element={<ResetPassword />}></Route>
          <Route path="reset-password-request" element={<PasswordResetRequestPage />}></Route>
          <Route path="reset-password-request-success" element={<PasswordResetRequestSuccessPage />}></Route>

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

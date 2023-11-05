import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeContent from "./Pages/Home/WelcomeContent";
import LoginPage from "./Pages/Website/Auth/Login/LoginPage";
import SignUpPage from "./Pages/Website/Auth/SignUp/SignUpPage";
import Dashboard from "./Pages/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import RequireAuth from "./Pages/Website/Auth/RequireAuth/RequireAuth";
// import SignUpPage from './Pages/Website/Auth/SignUp/SignUpPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeContent />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

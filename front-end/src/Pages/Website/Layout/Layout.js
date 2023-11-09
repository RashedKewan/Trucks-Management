import LanguageTransform from "./LanguageTransform";
import { Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
  return (
    <LanguageTransform>
      <main className="App">
        <Outlet />
      </main>
    </LanguageTransform>
  );
};

export default Layout;

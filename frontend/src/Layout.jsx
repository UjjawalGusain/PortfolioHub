import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="flex flex-col">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

import React from "react";
import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="flex flex-col max-h-screen max-w-screen">
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Layout;

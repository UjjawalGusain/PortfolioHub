import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Projects from "./components/Projects/Projects";
import More from "./components/More/More";
import Signup from "./components/Signup/Signup";
import VerifyOtp from "./components/VerifyOtp/VerifyOtp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: "", element: <Navigate to="home" /> },
      { path: "home", element: <Home/> },
      { path: "about", element: <About/> },
      { path: "contact", element: <Contact/> },
      { path: "projects", element: <Projects/> },
      { path: "more", element: <More/> },
    ]
  },
  {
    path: "/signup", // Main signup route
    element: <Signup/>,
  },
  {
    path: "/signup/verify-otp", // Verify OTP route
    element: <VerifyOtp/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


{/* <Route path="signup" element={<Signup />} /> */}
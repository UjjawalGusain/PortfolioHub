// UsernameLoader.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { PROFILE_ENDPOINTS, USER_ENDPOINTS } from "./services/apiService.js";
import Layout from "./Layout";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Projects from "./components/Projects/Projects";
import More from "./components/More/More";
import Signup from "./components/Signup/Signup";
import VerifyOtp from "./components/VerifyOtp/VerifyOtp";
import Login from "./components/Login/Login.jsx";
import ProjectPage from "./components/ProjectPage/ProjectPage.jsx";

const UsernameLoader = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.post(
            USER_ENDPOINTS.FETCH_USER_DATA,
            {},
            {
              withCredentials: true,
            }
          );
        setUsername(response.data.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={`/user/${username}`} />} />
          <Route path="user/:username" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectPage />} />
          <Route path="more" element={<More />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="signup/verify-otp" element={<VerifyOtp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default UsernameLoader;

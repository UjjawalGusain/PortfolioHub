// UsernameLoader.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { PROFILE_ENDPOINTS, USER_ENDPOINTS } from "../../services/apiService.js";
import Layout from "../../Layout.jsx";
import Home from "./Home.jsx";
import Contact from "../Contact/Contact.jsx";
import Projects from "../Projects/Projects.jsx";
import More from "../More/More.jsx";
import Signup from "../Signup/Signup.jsx";
import VerifyOtp from "../VerifyOtp/VerifyOtp.jsx";
import Login from "../Login/Login.jsx";
import ProjectPage from "../ProjectPage/ProjectPage.jsx";
import { useParams } from "react-router-dom";

const UsernameLoader = () => {
  const { pathUsername } = useParams();
  const [authUsername, setAuthUsername] = useState("")
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
          setAuthUsername(response.data.data.username);
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

  const isUserProfile = authUsername == pathUsername
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={`/user/${authUsername}/home`} />} />
          <Route path="user/:username/home" element={<Home />} />
          <Route path="user/:username/contact" element={<Contact />} />
          <Route path="user/:username/projects" element={<Projects />} />
          <Route path="user/:username/projects/:projectName" element={<ProjectPage />} />
          <Route path="user/:username/more" element={<More />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="signup/verify-otp" element={<VerifyOtp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default UsernameLoader;

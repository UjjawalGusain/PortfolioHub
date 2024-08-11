// Header.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { USER_ENDPOINTS } from "../../services/apiService";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import SearchButton from "./SearchButton/SearchButton";
import { logout } from "../../redux/auth/authThunks";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useFetchAllData from "../../hooks/useFetchAllData";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authUsername, setAuthUsername] = useState("");
  const location = useLocation();

  const {isUserAuthenticated, username} = useFetchAllData()

  const handleSettingsClick = () => {
    console.log("Works username: ", username);
    navigate(`/user/${username}/settings`)
  };

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
      }
    };
    fetchUsername();
  }, []);

  const clickLogout = async () => {
    try {
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="h-20 flex bg-home-white sticky top-0 z-20 border-none">
      <div className="w-1/3 flex text-black">
        <div className="ml-4 w-1/6 flex items-center justify-center ">
          <Link to={`/user/${authUsername}/home`}>
            <img src="/logo.png" alt="Logo" className="h-auto max-w-full" />
          </Link>
        </div>
      </div>
      <div className="w-1/3 flex justify-center text-black">
        <ul className="flex justify-end items-center text-black font-sans font-medium gap-5 text-lg">
          <li>
            <NavLink
              to={`/user/${username}/home`}
              className={({ isActive }) =>
                (isActive ? "text-button-red " : " ") + "hover:underline"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/user/${username}/projects`}
              className={({ isActive }) =>
                (isActive ? "text-button-red " : " ") + "hover:underline"
              }
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/user/${username}/contact`}
              className={({ isActive }) =>
                (isActive ? "text-button-red " : " ") + "hover:underline"
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/user/${username}/certifications`}
              className={({ isActive }) =>
                (isActive ? "text-button-red " : " ") + "hover:underline"
              }
            >
              Certifications
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/user/${username}/about-us`}
              className={({ isActive }) =>
                (isActive ? "text-button-red " : " ") + "hover:underline"
              }
            >
              About Us
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-1/3 flex justify-center items-center gap-8">
        {authUsername === "" ? (
          <>
            <div className="flex gap-10">
              <button
                className="text-black font-sans font-medium text-lg hover:underline"
                onClick={() => navigate("/login")}
              >
                <p className="font-sans">Login</p>
              </button>

              <button
                className="text-black font-sans font-medium gap-5 text-lg hover:underline"
                onClick={() => navigate("/signup")}
              >
                <p className="font-sans">Signup</p>
              </button>
            </div>
          </>
        ) : isUserAuthenticated ? (
          <>
            <div className="flex gap-10">
              <SearchButton />

              <button
                className="text-black font-sans font-medium gap-5 text-lg hover:underline"
                onClick={clickLogout}
              >
                <p className="font-sans">Logout</p>
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="text-black font-sans font-medium gap-5 text-lg hover:underline"
              onClick={() => {
                const currentPath = location.pathname
                  .split("/")
                  .slice(3)
                  .join("/");
                navigate(`/user/${authUsername}/${currentPath}`, {
                  replace: true,
                });
              }}
            >
              <p className="font-sans">Go Back Home!</p>
            </button>
          </>
        )}
      </div>
      {isUserAuthenticated ? (
        <div className="w-[5%] flex">
          <div className="flex justify-center items-center w-full">
            <button onClick={handleSettingsClick}>
              <IoMdSettings className="text-4xl" />
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Header;

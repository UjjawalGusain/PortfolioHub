// Header.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { USER_ENDPOINTS } from "../../services/apiService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { username } = useParams();
  const pathUsername = username;
  const [authUsername, setAuthUsername] = useState("");
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

  const clickLogout = async () => {
    try {
      const res = await axios.post(
        USER_ENDPOINTS.LOGOUT,
        {},
        {
          withCredentials: true,
        }
      );

      console.log("Successfully logged out: ", res.data);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const clickSearch = () => {
    console.log("Search Openend");
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const isUserProfile = authUsername === pathUsername;
  // const isUserProfile = true
  return (
    <div className="h-20 flex bg-home-black sticky top-0">
      <div className="w-1/3 flex text-home-gold">
        <div className="ml-4 w-1/6 flex items-center justify-center">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-auto max-w-full" />
          </Link>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-center p-2">
        <ul className="flex justify-between items-center text-white font-sans">
          <li>
            <NavLink
              to={`/user/${pathUsername}/home`}
              className={({ isActive }) => (isActive ? "text-home-gold" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/user/${pathUsername}/projects`}
              className={({ isActive }) => (isActive ? "text-home-gold" : "")}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/user/${pathUsername}/contact`}
              className={({ isActive }) => (isActive ? "text-home-gold" : "")}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/user/${pathUsername}/achievements`}
              className={({ isActive }) => (isActive ? "text-home-gold" : "")}
            >
              Achievements
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-1/3 flex justify-center items-center">
        {authUsername === "" ? (
          <>
            <button
              className="w-1/5 h-3/5 transition duration-500 ease-in-out transform active:scale-95 text-home-gold hover:underline"
              onClick={() => navigate("/login")}
            >
              <p className="font-sans">Login</p>
            </button>

            <button
              className="w-1/5 h-3/5 border-2 border-home-gold rounded-xl transition duration-500 ease-in-out transform hover:bg-home-gold active:scale-95 text-home-gold hover:text-black"
              onClick={() => navigate("/signup")}
            >
              <p className="font-sans">Signup</p>
            </button>
          </>
        ) : isUserProfile ? (
          // Case when isUserProfile is true
          <>
            <button
              className="w-1/5 h-3/5 border-2 border-home-gold rounded-xl transition duration-500 ease-in-out transform hover:bg-home-gold active:scale-95 text-home-gold hover:text-black"
              onClick={clickSearch}
            >
              <p className="font-sans">Search</p>
            </button>

            <button
              className="w-1/5 h-3/5 transition duration-500 ease-in-out transform active:scale-95 text-home-gold hover:underline"
              onClick={clickLogout}
            >
              <p className="font-sans">Logout</p>
            </button>
          </>
        ) : (
          <>
            <button
              className="w-2/5 h-3/5 border-2 border-home-gold rounded-xl transition duration-500 ease-in-out transform hover:bg-home-gold active:scale-95 text-home-gold hover:text-black"
              onClick={() => navigate(`/user/${authUsername}/home`)}
            >
              <p className="font-sans">Go Back Home!</p>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;

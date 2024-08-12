import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { USER_ENDPOINTS } from "../../services/apiService";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import SearchButton from "./SearchButton/SearchButton";
import { logout } from "../../redux/auth/authThunks";
import { IoMdSettings } from "react-icons/io";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import useFetchAllData from "../../hooks/useFetchAllData";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authUsername, setAuthUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const { isUserAuthenticated, username } = useFetchAllData();

  const handleSettingsClick = () => {
    navigate(`/user/${username}/settings`);
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
    <header className="h-20 flex bg-home-white sticky top-0 z-20 border-none">
      {/* Desktop View */}
      <div className="hidden xl:flex w-full">
        <div className="w-1/3 flex text-black items-center">
          <div className="ml-4 w-1/6 flex items-center justify-center">
            <Link to={`/user/${authUsername}/home`}>
              <img src="/logo.png" alt="Logo" className="h-auto max-w-full" />
            </Link>
          </div>
        </div>
        <div className="w-1/3 flex justify-center text-black items-center">
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
          <SearchButton />
          {authUsername === "" ? (
            <>
              <div className="flex gap-10">
                <button
                  className="text-black font-sans font-medium text-lg hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="text-black font-sans font-medium text-lg hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </div>
            </>
          ) : isUserAuthenticated ? (
            <>
              <div className="flex gap-10">
                <button
                  className="text-black font-sans font-medium text-lg hover:underline"
                  onClick={clickLogout}
                >
                  Logout
                </button>
              </div>
              <div className="w-[5%] flex">
                <button onClick={handleSettingsClick}>
                  <IoMdSettings className="text-4xl" />
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className="text-black font-sans font-medium text-lg hover:underline"
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
                Go Back Home!
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="xl:hidden flex items-center justify-between w-full px-4 py-2">
        <Link to={`/user/${authUsername}/home`}>
          <img src="/logo.png" alt="Logo" className="h-auto max-w-[100px]" />
        </Link>
        <SearchButton />
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-3xl"
        >
          <PiDotsThreeOutlineVerticalLight />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-20 right-4 bg-white shadow-lg rounded-lg p-4 w-48">
            <ul className="flex flex-col gap-2">
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
              {authUsername === "" ? (
                <>
                  <li>
                    <button
                      className="text-black hover:underline"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-black hover:underline"
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </button>
                  </li>
                </>
              ) : isUserAuthenticated ? (
                <>
                  <li>
                    <button
                      className="text-black hover:underline"
                      onClick={clickLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    className="text-black hover:underline"
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
                    Go Back Home!
                  </button>
                </li>
              )}
              {isUserAuthenticated && (
                <li>
                  <button
                    className="text-black hover:underline"
                    onClick={handleSettingsClick}
                  >
                    Settings
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

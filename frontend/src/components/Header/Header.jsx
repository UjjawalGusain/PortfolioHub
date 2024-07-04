import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="w-screen h-20 flex bg-home-black">
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
                to="home"
                className={({ isActive }) => (isActive ? "text-home-gold" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="about"
                className={({ isActive }) => (isActive ? "text-home-gold" : "")}
              >
                About Me
              </NavLink>
            </li>
            <li>
              <NavLink
                to="projects"
                className={({ isActive }) => (isActive ? "text-home-gold" : "")}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="contact"
                className={({ isActive }) => (isActive ? "text-home-gold" : "")}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="more"
                className={({ isActive }) => (isActive ? "text-home-gold" : "")}
              >
                More
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <button className="w-1/5 h-3/5 border-2 border-home-gold rounded-xl transition duration-500 ease-in-out transform hover:bg-home-gold active:scale-95 text-home-gold hover:text-black">
            <p className="font-sans">
              Search
            </p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;

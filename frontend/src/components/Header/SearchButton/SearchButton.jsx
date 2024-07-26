import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { USER_ENDPOINTS } from "../../../services/apiService";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchButton = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleClickUser = (username) => {
    navigate(`/user/${username}/home`);
    setShowDropdown(false); // Hide dropdown when user is selected
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(USER_ENDPOINTS.SEARCH, {
        params: { username: searchQuery },
      });
      setResults(response.data.data);
      setShowDropdown(response.data.data.length > 0); // Show dropdown only if there are results
    } catch (err) {
      setError("Error fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
  };

  return (
    <div className="flex w-56 relative" ref={ref}>
      <div className="w-10/12 gap-0">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search username"
          className="border-2 p-2 rounded-md rounded-r-none w-full focus:outline-none focus:bg-slate-100"
        />
        {(error || loading) && <div></div>}
        {results.length > 0 && showDropdown && (
          <ul className="absolute rounded-md top-full left-0 w-full border border-gray-300 bg-white z-10">
            {results.map((user) => (
              <li key={user._id}>
                <button
                  className="p-2 hover:bg-gray-100 w-full cursor-pointer h-8 flex justify-start items-center"
                  onClick={() => handleClickUser(user.username)}
                >
                  {user.username}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="w-2/12 flex items-center justify-center text-2xl border-2 hover:bg-slate-100 rounded-md rounded-l-none"
        onClick={() => handleSearch(query)}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchButton;

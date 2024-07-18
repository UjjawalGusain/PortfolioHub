import React, { useEffect, useState } from "react";
import axios from "axios";
import { PROFILE_ENDPOINTS } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { fetchGithubData } from "../../api/githubApi";
import { FaDownload } from "react-icons/fa";

function Home() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [githubLoading, setGithubLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PROFILE_ENDPOINTS.FETCH_USER_PROFILE.replace(':username', username));
        setUserData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        if (userData && userData.githubId) {
          const data = await fetchGithubData(userData.githubId);
          setGithubData(data);
        }
        setGithubLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setGithubLoading(false);
      }
    };

    if (userData) {
      fetchGithub();
    }
  }, [userData]);

  const handleDownloadClick = () => {
    // Implement the download functionality here
  };

  if (loading || githubLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-home-black text-white">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="h-screen bg-home-black">
      <div className="flex flex-col h-[65vh] justify-center">
        <div className="flex">
          <div className="flex flex-col w-2/3 h-1/4">
            <div className="text-white p-10">
              <p className="text-3xl mb-5">Hello!</p>
              <p className="text-7xl mb-3">
                I'm <span className="text-home-gold">{userData.fullname}</span>
              </p>
              <p className="text-4xl mb-4">{userData.position}</p>
              <p className="text-lg">{userData.description}</p>
            </div>
            <div className="mx-10 my-5">
              <button
                className="text-black font-semibold bg-home-gold py-2 rounded-xl flex px-6 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleDownloadClick}
              >
                DOWNLOAD RESUME <FaDownload className="relative top-1 ml-5" />
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center w-1/3">
            <div className="relative w-72 h-72">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-home-gold"></div>
              {userData.profilePic && (
                <>
                  <img
                    src={userData.profilePic}
                    alt="profileImg"
                    className="rounded-full w-full h-full object-cover z-10"
                  />
                  <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-home-black via-transparent to-home-black opacity-50"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start p-10 pt-5 text-center">
        <div className="m-5 mr-10">
          {githubData && (
            <div>
              <div className="text-home-gold text-4xl font-bold">{`${githubData.followers}+`}</div>
              <div className="text-white text-sm">Followers on Github</div>
            </div>
          )}
        </div>
        {githubData && (
          <div className="m-5 mr-10">
            <div className="text-home-gold text-4xl font-bold">{`${githubData.following}+`}</div>
            <div className="text-white text-sm">Following on Github</div>
          </div>
        )}
        <div className="mx-5 mt-12">
          <a
            href={`https://github.com/${userData.githubId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black bg-home-gold py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-opacity-80 transition duration-300 ease-in-out"
          >
            Visit my Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

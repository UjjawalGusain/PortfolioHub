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
        const response = await axios.get(
          PROFILE_ENDPOINTS.FETCH_USER_PROFILE.replace(":username", username)
        );
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
      <div className="h-screen bg-home-black text-white">Error: {error}</div>
    );
  }

  return (
    <div className="h-full bg-home-white">
      <div className="px-16 flex">
        <div className="w-3/5">
          <div>
            <p className="text-3xl mb-5">Hello!</p>
            <p className="text-7xl mb-3">
              I'm <span className="text-home-gold">{userData.fullname}</span>
            </p>
            <p className="text-4xl mb-4">{userData.position}</p>
            <p className="text-lg">{userData.description}</p>
          </div>
          <div className="my-5">
            <button
              className="bg-button-red text-white flex px-3 py-1 rounded-sm border-2 hover:bg-home-white hover:text-button-red hover:border-button-red"
              onClick={handleDownloadClick}
            >
              Download Resume <FaDownload className="relative top-1 ml-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center w-2/5">
          <div className="relative w-80 h-80">
            <div className="absolute top-0 left-0 w-full h-full rounded-full"></div>
            {userData.profilePic && (
              <>
                <img
                  src={userData.profilePic}
                  alt="profileImg"
                  className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-home-black via-transparent to-home-black opacity-50"></div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between p-10 pt-5 text-center w-full mt-36">
        <div className="flex justify-around">
          <div className="m-5 mr-10">
            {githubData && (
              <div>
                <div className="text-button-red text-3xl font-bold">{`${githubData.followers}+`}</div>
                <div className="text-black text-sm font-medium">
                  Followers on Github
                </div>
              </div>
            )}
          </div>
          <div className="m-5 mr-10">
            {githubData && (
              <div>
                <div className="text-button-red text-3xl font-bold">{`${githubData.following}+`}</div>
                <div className="text-black text-sm font-medium">
                  Following on Github
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mx-5 mt-12">
          <a
            href={`https://github.com/${userData.githubId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-button-red text-white flex px-3 py-1 rounded-sm border-2 hover:bg-home-white hover:text-button-red hover:border-button-red"
          >
            Come Visit my Github
          </a>
        </div>
      </div>
    </div>

  );
}

export default Home;
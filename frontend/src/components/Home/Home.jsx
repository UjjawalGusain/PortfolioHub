import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import AddResumeButton from "./Buttons/AddResumeButton";
import { fetchUserData } from "../../redux/auth/authThunks";
import { fetchProfileData } from "../../redux/profile/profileThunks";
import { useDispatch, useSelector } from "react-redux";
import { fetchGithub } from "../../redux/github/githubThunks";

// What do I have to do?

// Basically, there will be two slices: user slice, and profile slice
// User slice will contain all the logged in user info
// Profile slice will contain all the opened user info(logged in or not)

// All the details that will be opened will be based on profile slice info
// But, using the user slice info, we can check if the profile opened is of user or not

// So here will be the step by step of what I have to do

// 1. Create a user slice. It will have a reducer which will be called when I want to refresh the user data.
// 2. Create a profile slice. It will be have a reducer which will be called when I want to refresh the profile data.

function Home() {
  const { username } = useParams();
  const [error, setError] = useState(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const dispatch = useDispatch();

  const githubData = useSelector((state) => state.github?.githubData);

  const [loading, setLoading] = useState(true);
  const authUserData = useSelector((state) => state.auth?.user);
  const authUsername = authUserData?.username || "";

  const userData = useSelector((state) => state.profile?.profile);


  // Use Effect for fetching Authenticated User Data if not available in slice
  useEffect(() => {
    const fetchAuthData = async () => {
      if (!authUserData) {
        try {
          await dispatch(fetchUserData()).unwrap();
          setLoading(false);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError(err.message);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAuthData();
  }, [authUserData, dispatch]);

  // Use Effect for fetching Profile Data(Unauthenticated user) if not available in slice
  useEffect(() => {
    const fetchProfileDataFunc = async () => {
      if (!userData || userData.username !== username) {
        try {
          await dispatch(fetchProfileData(username)).unwrap();
          setLoading(false);
        } catch (err) {
          console.error("Error fetching profile user data:", err);
          setError(err.message);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfileDataFunc();
  }, [userData, dispatch, username]);

  // Use Effect for fetching Github Data of profile if not available in slice
  useEffect(() => {
    const asyncGithubFetchData = async () => {
      if (!githubData) {
        try {
          await dispatch(fetchGithub(userData)).unwrap();
          setGithubLoading(false);
        } catch (error) {
          console.error("Error dispatching fetch github: ", error);
        }
      } 
    };
    asyncGithubFetchData();
  }, [githubData, username, userData]);

  // Handling resume upload
  const handleResumeUploaded = async () => {
    try {
      await dispatch(fetchProfileData(username)).unwrap();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handling show resume
  const handleShowResume = () => {
    if (userData && userData.resume) {
      window.open(userData.resume, "_blank");
    }
  };

  // Handling the case when data is not there
  if (loading || githubLoading || !userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  // Handling error scenarios
  if (error) {
    return (
      <div className="h-screen bg-home-black text-white">Error: {error}</div>
    );
  }

  // If the profile opened is authenticated user(logged in user) on not
  const isUserAuthenticated = username === authUsername;

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
          <div className="my-5 flex gap-3">
            {userData.resume && (
              <button
                className="bg-button-red text-white flex px-3 py-1 rounded-sm border-2 hover:bg-home-white hover:text-button-red hover:border-button-red transition-colors duration-300 ease-in-out"
                onClick={handleShowResume}
              >
                Show Resume <FaDownload className="relative top-1 ml-5" />
              </button>
            )}

            {userData && isUserAuthenticated && (
              <AddResumeButton
                userData={userData}
                handleResumeUploaded={handleResumeUploaded}
              />
            )}
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

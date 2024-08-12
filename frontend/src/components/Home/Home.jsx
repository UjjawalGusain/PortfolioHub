import React, {useEffect} from "react";
import { FaDownload } from "react-icons/fa";
import AddResumeButton from "./Buttons/AddResumeButton";
import { fetchProfileData } from "../../redux/profile/profileThunks";
import { useDispatch, useSelector } from "react-redux";
import useFetchAllData from "../../hooks/useFetchAllData";

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
  const dispatch = useDispatch();

  const githubData = useSelector((state) => state.github?.githubData);
  const userData = useSelector((state) => state.profile?.profile);

  const { loading, githubLoading, error, isUserAuthenticated, username} = useFetchAllData()

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


  
  return (
    <div className="h-full bg-home-white">
      <div className=" justify-center items-center lg:px-16 flex lg:flex-row flex-col-reverse">
        <div className="w-3/5 py-6 lg:p-0">
          <div>
            <p className="md:text-3xl text-xl mb-5 ">Hello!</p>
            <p className="md:text-7xl text-5xl mb-3">
              I'm <span className="text-home-gold">{userData.fullname}</span>
            </p>
            <p className="md:text-4xl text-2xl mb-4">{userData.position}</p>
            <p className="md:text-lg text-base">{userData.description}</p>
          </div>
          <div className="my-5 flex md:flex-row gap-3 flex-col">
            {userData.resume && (
              <button
                className="bg-button-red text-white flex px-3 py-1 rounded-sm border-2 hover:bg-home-white hover:text-button-red hover:border-button-red transition-colors duration-300 ease-in-out items-center justify-center"
                onClick={handleShowResume}
              >
                Show Resume <FaDownload className="relative ml-5" />
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
          <div className="relative lg:size-80 md:size-52 sm:size-44 size-32">
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

      <div className="flex md:flex-row flex-col justify-between p-10 pt-5 text-center w-full mt-36">
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
            className="bg-button-red text-white flex px-3 py-1 rounded-sm border-2 hover:bg-home-white hover:text-button-red hover:border-button-red items-center justify-center"
          >
            Come Visit my Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

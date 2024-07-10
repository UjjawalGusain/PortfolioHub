import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../redux/auth/authSlice";
import { FaDownload } from "react-icons/fa";
import { fetchGithubData } from "../../api/githubApi";

function Home() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.auth.auth.user?.data || "");

  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userAuth.githubId) {
          const data = await fetchGithubData(userAuth.githubId);
          setGithubData(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setLoading(false);
      }
    };

    if (!userLoading) {
      fetchData();
    }
  }, [userAuth.githubId, userLoading]);

  useEffect(() => {
    const loadUserData = async () => {
      await dispatch(fetchUserData());
      setUserLoading(false);
    };

    loadUserData();
  }, [dispatch]);

  const handleDownloadClick = () => {
    console.log(githubData);
    console.log("button");
  };

  if (userLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-2xl">Loading...</p>
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
                I'm <span className="text-home-gold">{userAuth.fullname}</span>
              </p>
              <p className="text-4xl mb-4">{userAuth.position}</p>
              <p className="text-lg">{userAuth.description}</p>
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
              {userAuth.profilePic && (
                <>
                  <img
                    src={userAuth.profilePic}
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
          {githubData && githubData.followers && (
            <div>
              <div className="text-home-gold text-4xl font-bold">{`${githubData.followers}+`}</div>
              <div className="text-white text-sm">Followers on Github</div>
            </div>
          )}
        </div>
        {githubData && githubData.following && (
          <div className="m-5 mr-10">
            <div className="text-home-gold text-4xl font-bold">{`${githubData.following}+`}</div>
            <div className="text-white text-sm">Following on Github</div>
          </div>
        )}
        <div className="mx-5 mt-12">
          <a
            href={`https://github.com/${userAuth.githubId}`}
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/projects/projectsThunks";
import { fetchGithub } from "../redux/github/githubThunks";
import { fetchUserData } from "../redux/auth/authThunks";
import { fetchProfileData } from "../redux/profile/profileThunks";

function useFetchAllData() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [githubLoading, setGithubLoading] = useState(false);

  const dispatch = useDispatch();

  const authUserData = useSelector((state) => state.auth?.user);
  const projects = useSelector((state) => state.projects?.projects);
  const githubData = useSelector((state) => state.github?.githubData);
  const userData = useSelector((state) => state.profile?.profile);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setGithubLoading(true);

      try {

        // Fetch GitHub data if not already present or if username has changed
        if (!githubData || (userData && userData.username !== username)) {
          console.log(userData.username, " ", username);
          await dispatch(fetchGithub(userData)).unwrap();
        }

        // Fetch profile data if it doesn't match or is absent
        if (!userData || userData.username !== username) {
          await dispatch(fetchProfileData(username)).unwrap();
        }

        // Fetch projects if not already present
        if (!projects) {
          await dispatch(fetchProjects(username)).unwrap();
        }

        // Fetch user data if not already present
        if (!authUserData) {
          await dispatch(fetchUserData()).unwrap();
        }

       
        

      } catch (err) {
        setError(err.message);
        console.error("Error in data fetching: ", err);
      } finally {
        setLoading(false);
        setGithubLoading(false);
      }
    };

    fetchData();
  }, [dispatch, username, projects, authUserData, userData, githubData]);

  const isUserAuthenticated = authUserData ? username === authUserData.username : false;
  return { loading, githubLoading, error, isUserAuthenticated, username };
}

export default useFetchAllData;

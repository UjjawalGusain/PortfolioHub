import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/projects/projectsThunks";
import { fetchGithub } from "../redux/github/githubThunks";
import { fetchUserData } from "../redux/auth/authThunks";
import { fetchProfileData } from "../redux/profile/profileThunks";
import { fetchCertificates } from "../redux/certificates/certificatesThunks";

function useFetchAllData() {
  const { username } = useParams();

  const [loading, setLoading] = useState(true);
  const [githubLoading, setGithubLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({
    user: false,
    profile: false,
    github: false,
    projects: false,
    certificates: false,
  });

  const dispatch = useDispatch();

  const authUserData = useSelector((state) => state.auth?.user);
  const projects = useSelector((state) => state.projects?.projects);
  const githubData = useSelector((state) => state.github?.githubData);
  const userData = useSelector((state) => state.profile?.profile);
  const certificates = useSelector((state) => state.certificates?.certificates);

  // Ref to store previous username
  const prevUsernameRef = useRef(username);

  // Reset fetchStatus when username changes
  useEffect(() => {
    if (fetchStatus.profile && fetchStatus.github && fetchStatus.projects && fetchStatus.certificates) {      
      setFetchStatus({
        user: fetchStatus.user, 
        profile: false,
        github: false,
        projects: false,
        certificates: false,
      });
      prevUsernameRef.current = username;
    }
  }, [username, fetchStatus]);


  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
          await dispatch(fetchUserData()).unwrap();
          setFetchStatus((prev) => ({ ...prev, user: true }));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user data: ", err);
      }
    };

    if (!authUserData) {
      fetchUser();
    }
    
  }, [dispatch, authUserData]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await dispatch(fetchProfileData(username)).unwrap();
        setFetchStatus((prev) => ({ ...prev, profile: true }));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching profile data: ", err);
      }
    };    
    
  
    if (username !== prevUsernameRef.current || !userData) {
      fetchProfile();
    }
  }, [dispatch, username, fetchStatus.profile]);

  // Fetch GitHub data
  useEffect(() => {
    const fetchGithubData = async () => {
        try {
          setGithubLoading(true);
          await dispatch(fetchGithub(userData)).unwrap();
          setFetchStatus((prev) => ({ ...prev, github: true }));
        } catch (err) {
          setError(err.message);
          console.error("Error fetching GitHub data: ", err);
        } finally {
          setGithubLoading(false);
        }
    };

    if (username !== prevUsernameRef.current || !githubData) {
      fetchGithubData();
    }
  }, [dispatch, userData, fetchStatus.github]);

  // Fetch projects
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        await dispatch(fetchProjects(username)).unwrap();
        setFetchStatus((prev) => ({ ...prev, projects: true }));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching projects data: ", err);
      }
    };

    if (username !== prevUsernameRef.current || !projects) {
      fetchProjectsData();
    }
  }, [dispatch, username, fetchStatus.projects]);

  // Fetch certificates
  useEffect(() => {
    const fetchCertificatesData = async () => {
      try {
        await dispatch(fetchCertificates(username)).unwrap();
        setFetchStatus((prev) => ({ ...prev, certificates: true }));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching certificates: ", err);
      }
    };

    if (username !== prevUsernameRef.current || !certificates) {
      fetchCertificatesData();
    }
  }, [dispatch, username, fetchStatus.certificates]);

  // Check if all data has been fetched
  useEffect(() => {
    setLoading(false);
  }, [fetchStatus]);

  // Check if user is authenticated
  const isUserAuthenticated = authUserData
    ? username === authUserData.username
    : false;

  return { loading, githubLoading, error, isUserAuthenticated, username };
}

export default useFetchAllData;
  

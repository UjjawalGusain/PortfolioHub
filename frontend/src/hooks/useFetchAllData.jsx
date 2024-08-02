import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/projects/projectsThunks";
import { fetchGithub } from "../redux/github/githubThunks";
import { fetchUserData } from "../redux/auth/authThunks";
import { fetchProfileData } from "../redux/profile/profileThunks";
import { fetchCertificates } from "../redux/certificates/certificatesThunks";

function useFetchAllData() {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState({
    // user: false,
    profile: false,
    github: false,
    projects: false,
    certificates: false
  });

  const dispatch = useDispatch();

  const authUserData = useSelector((state) => state.auth?.user);
  const projects = useSelector((state) => state.projects?.projects);
  const githubData = useSelector((state) => state.github?.githubData);
  const userData = useSelector((state) => state.profile?.profile);
  const certificates = useSelector((state) => state.certificates?.certificates);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!authUserData) {
          console.log("Fetching user data");
          await dispatch(fetchUserData()).unwrap();
          // setFetchStatus((prev) => ({ ...prev, user: true }));
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user data: ", err);
      }
    };

    fetchUser();
  }, [dispatch, authUserData]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userData || userData.username !== username) {
        try {
          console.log("Fetching profile data");
          await dispatch(fetchProfileData(username)).unwrap();
          setFetchStatus((prev) => ({ ...prev, profile: true }));
        } catch (err) {
          setError(err.message);
          console.error("Error fetching profile data: ", err);
        }
      }
    };

    if (!fetchStatus.profile || username !== userData?.username) {
      fetchProfile();
    }
  }, [dispatch, username, fetchStatus.profile]);

  // Fetch GitHub data
  useEffect(() => {
    const fetchGithubData = async () => {
      if (!githubData || (userData && userData.username !== username)) {
        try {
          console.log("Fetching GitHub data");
          setGithubLoading(true);
          await dispatch(fetchGithub(userData)).unwrap();
          setFetchStatus((prev) => ({ ...prev, github: true }));
        } catch (err) {
          setError(err.message);
          console.error("Error fetching GitHub data: ", err);
        } finally {
          setGithubLoading(false);
        }
      }
    };

    if (!fetchStatus.github) {
      fetchGithubData();
    }
  }, [dispatch, userData, fetchStatus.github]);

  // Fetch projects
  useEffect(() => {
    const fetchProjectsData = async () => {
      if (!projects) {
        try {
          console.log("Fetching projects data");
          await dispatch(fetchProjects(username)).unwrap();
          setFetchStatus((prev) => ({ ...prev, projects: true }));
        } catch (err) {
          setError(err.message);
          console.error("Error fetching projects data: ", err);
        }
      }
    };

    if (!fetchStatus.projects) {
      fetchProjectsData();
    }
  }, [dispatch, username, projects, fetchStatus.projects]);

  // Fetch certificates
  useEffect(() => {
    const fetchCertificatesData = async () => {
      if (!certificates) {
        try {
          console.log("Fetching certificates data");
          await dispatch(fetchCertificates(username)).unwrap();
          setFetchStatus((prev) => ({ ...prev, certificates: true }));
        } catch (err) {
          setError(err.message);
          console.error("Error fetching certificates: ", err);
        }
      }
    };

    if (!fetchStatus.certificates) {
      fetchCertificatesData();
    }
  }, [dispatch, username, certificates, fetchStatus.certificates]);

  // Check if all data has been fetched
  useEffect(() => {
    if (
      // fetchStatus.user &&
      fetchStatus.profile &&
      fetchStatus.github &&
      fetchStatus.projects &&
      fetchStatus.certificates
    ) {
      console.log("Should be false");
      setLoading(false);
    }
  }, [fetchStatus]);

  // Check if user is authenticated
  const isUserAuthenticated = authUserData
    ? username === authUserData.username
    : false;

  return { loading, githubLoading, error, isUserAuthenticated, username };
}

export default useFetchAllData;

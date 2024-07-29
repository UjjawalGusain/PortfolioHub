import React, { useEffect, useState } from "react";
import AddProjectCard from "./AddProjectDetails/AddProjectCard";
import PaginatedCards from "./ProjectCards/PaginatedCards";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTopButton from "./ScrollToTopButton/ScrollToTopButton";
import { fetchUserData } from "../../redux/auth/authThunks.js";
import { fetchProjects } from "../../redux/project/projectsThunks.js";

export default function Projects() {
  const { username } = useParams();
  const [showAddProject, setShowAddProject] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const authUserData = useSelector((state) => state.auth?.user);
  const authUsername = authUserData?.username || "";

  const projects = useSelector((state) => state.projects?.projects);
  
  useEffect(() => {
    const fetchProjectsFunc = async () => {
      if (projects === null) {
        setLoading(true)
        try {
          console.log("Here before dispatch");
          await dispatch(fetchProjects(username)).unwrap();
          setLoading(false)
          console.log("Projects dispatched");
        } catch (error) {
          setLoading(false)
          setError(true)
          console.error("Error generated while dispatching projects: ", error);
        }
      } else {
        console.log("Projects were already there");
      }

    };
    fetchProjectsFunc()

  }, [dispatch, projects, username]);

  useEffect(() => {
    const fetchAuthData = async () => {
      if (!authUserData) {
        try {
          await dispatch(fetchUserData()).unwrap();
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

  const handleAddProjectClick = () => {
    setShowAddProject(true);
  };


  if (loading || projects === undefined) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const isUserAuthenticate = authUsername === username;

  return (
    <div
      id="projects"
      className="h-full w-full bg-home-white flex flex-col items-center text-black relative p-5"
    >
      {!projects|| projects.length == 0 || showAddProject ? (
        <></>
      ) : (
        <h1 className="text-4xl font-bold text-text-blue w-3/5 text-left ">
          Projects
        </h1>
      )}

      <ScrollToTopButton />

      {showAddProject ? (
        <AddProjectCard setShowAddProject={setShowAddProject} />
      ) : (
        <PaginatedCards
          projectsPerPage={5}
          projects={projects}
          handleAddProjectClick={handleAddProjectClick}
          isUserAuthenticate={isUserAuthenticate}
        />
      )}
      {isUserAuthenticate && !showAddProject ? (
        <button
          className="fixed bottom-4 left-4 border-2 rounded px-5 py-2 bg-button-red hover:bg-home-white hover:text-button-red hover:border-button-red z-30 transition-colors duration-300 ease-in-out text-home-white"
          onClick={handleAddProjectClick}
        >
          Add Project
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

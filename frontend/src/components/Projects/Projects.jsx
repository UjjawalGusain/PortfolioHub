import React, { useState } from "react";
import AddProjectCard from "./AddProjectDetails/AddProjectCard";
import PaginatedCards from "./ProjectCards/PaginatedCards";
import { useSelector } from "react-redux";
import ScrollToTopButton from "./ScrollToTopButton/ScrollToTopButton";
import useFetchAllData from "../../hooks/useFetchAllData.jsx";

export default function Projects() {
  const [showAddProject, setShowAddProject] = useState(false);

  const projects = useSelector((state) => state.projects?.projects);
  
  const { loading, error, isUserAuthenticated } = useFetchAllData()
  
  const handleAddProjectClick = () => {
    setShowAddProject(true);
  };


  if (loading || projects === undefined) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }


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
          isUserAuthenticate={isUserAuthenticated}
        />
      )}
      {isUserAuthenticated && !showAddProject ? (
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

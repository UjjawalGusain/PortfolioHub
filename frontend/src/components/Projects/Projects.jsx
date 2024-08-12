import React, { useState } from "react";
import AddProjectCard from "./AddProjectDetails/AddProjectCard";
import PaginatedCards from "./ProjectCards/PaginatedCards";
import { useSelector } from "react-redux";
import ScrollToTopButton from "./ScrollToTopButton/ScrollToTopButton";
import useFetchAllData from "../../hooks/useFetchAllData.jsx";

export default function Projects() {
  const [showAddProject, setShowAddProject] = useState(false);

  const projects = useSelector((state) => state.projects?.projects);
  
  const { loading, error, isUserAuthenticated } = useFetchAllData();
  
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
      className="h-full w-full bg-home-white flex flex-col items-center text-black relative p-5 lg:p-8"
    >
      {!projects || projects.length === 0 || showAddProject ? (
        <></>
      ) : (
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-blue w-full md:w-4/5 lg:w-3/5 text-left mb-5">
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
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 border-2 rounded px-4 py-2 md:px-5 md:py-3 bg-button-red hover:bg-home-white hover:text-button-red hover:border-button-red z-30 transition-colors duration-300 ease-in-out text-home-white"
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

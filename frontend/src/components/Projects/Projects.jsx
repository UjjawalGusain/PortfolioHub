import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProjects } from "../../redux/project/projectsSlice";
import AddProjectCard from "./AddProjectCard";
import PaginatedCards from "./ProjectCards/PaginatedCards";

export default function Projects() {
  const dispatch = useDispatch();
  const [showAddProject, setShowAddProject] = useState(false);
  const { loading, error } = useSelector((state) => state.projects.project);
  const projects = useSelector(
    (state) => state.projects.project.projects?.data?.projectObjects || []
  );

  const handleAddProjectClick = () => {
    setShowAddProject(true);
  };

  useEffect(() => {
    console.log("Projects: ", projects);
  }, [projects]);

  useEffect(() => {
    dispatch(fetchUserProjects());
  }, [dispatch, showAddProject]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="h-screen w-full bg-home-black flex flex-col items-center text-white">
      {showAddProject ? (
        <AddProjectCard setShowAddProject={setShowAddProject} />
      ) : (
        <PaginatedCards
          projectsPerPage={6}
          projects={projects}
          handleAddProjectClick={handleAddProjectClick}
        />
      )}
    </div>
  );
}

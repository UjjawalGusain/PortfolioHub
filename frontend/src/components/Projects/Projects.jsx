import React, { useEffect, useState } from "react";
import CardDefault from "./CardDefault";
import NoProjectCard from "./NoProjectCard";
import AddProjectCard from "./AddProjectCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProjects } from "../../redux/project/projectsSlice";
import { FaPlus } from "react-icons/fa";

export default function Projects() {
  const dispatch = useDispatch();
  const [showAddProject, setShowAddProject] = useState(false);
  const { loading, error } = useSelector((state) => state.projects.project);
  const projects = useSelector(
    (state) => state.projects.project.projects?.data?.projectObjects
  );

  const handleAddProjectClick = () => {
    setShowAddProject(true);
  };

  useEffect(() => {
    dispatch(fetchUserProjects());
  }, [dispatch]);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="h-screen w-full bg-home-black flex flex-col items-center">
      {showAddProject ? (
        <AddProjectCard setShowAddProject={setShowAddProject} />
      ) : (
        <div>
          <div className="h-full w-full flex justify-center items-center">
            <div className="w-fit h-fit flex flex-wrap justify-evenly">
              {projects?.length === 0 && <NoProjectCard />}
              {projects?.length > 0 &&
                projects.map((project) => (
                  <CardDefault key={project._id} project={project} />
                ))}
            </div>
          </div>
          <button
            className="absolute bottom-8 left-8 border-2 w-36 h-10 rounded-xl border-home-gold text-home-gold
       flex justify-evenly items-center hover:bg-home-gold hover:text-white hover:border-white transition duration-300 ease-in-out"
            onClick={handleAddProjectClick}
          >
            <FaPlus className="w-5 h-5" /> Add Project
          </button>
        </div>
      )}
    </div>
  );
}

import React from "react";
import CardDefault from "../CardDefault";
import NoProjectCard from "../NoProjectCard";
import { FaPlus } from "react-icons/fa";

function ProjectCards({ currentProjects, handleAddProjectClick }) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-fit h-fit flex flex-wrap justify-evenly">
        {currentProjects?.length === 0 && <NoProjectCard />}
        {currentProjects?.length > 0 &&
          currentProjects.map((project) => (
            <CardDefault key={project._id} project={project} />
          ))}
      </div>
    </div>
  );
}

export default ProjectCards;

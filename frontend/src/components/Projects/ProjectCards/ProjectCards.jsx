import React from "react";
import CardDefault from "./CardDefault";
import NoProjectCard from "../NoProjectCard/NoProjectCard";

function ProjectCards({ currentProjects, handleAddProjectClick, isUserAuthenticate }) {
  return (
    <div className="h-full w-full flex justify-center items-center p-2">
      <div className="w-full h-full flex flex-wrap justify-evenly">
        {currentProjects?.length === 0 && (
          <NoProjectCard handleAddProjectClick={handleAddProjectClick} isUserAuthenticate={isUserAuthenticate}/>
        )}
        {currentProjects?.length > 0 &&
          currentProjects.map((project) => (
            <CardDefault key={project._id} project={project} isUserAuthenticate={isUserAuthenticate}/>
          ))}
      </div>
    </div>
  );
}

export default ProjectCards;

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ProjectCards from "./ProjectCards";

function PaginatedCards({ projectsPerPage, projects, handleAddProjectClick, isUserAuthenticate }) {
  const [projectOffset, setProjectOffset] = useState(0);

  if (!projects) {
    return null;
  }

  const endOffset = projectOffset + projectsPerPage;
  const currentProjects = projects.slice(projectOffset, endOffset);
  const pageCount = Math.ceil(projects.length / projectsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * projectsPerPage) % projects.length;
    setProjectOffset(newOffset);
  };

  return (
    <>
      <ProjectCards
        currentProjects={currentProjects}
        handleAddProjectClick={handleAddProjectClick}
        isUserAuthenticate={isUserAuthenticate}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName="flex text-sm md:text-base lg:text-xl w-full md:w-3/5 lg:w-2/5 justify-center gap-2"
        pageClassName="border-2 w-10 md:w-12 lg:w-16 rounded text-center border-black hover:underline"
        previousClassName="mr-4 md:mr-6 lg:mr-10 border-2 w-12 md:w-14 lg:w-20 rounded text-center border-black hover:underline"
        nextClassName="ml-4 md:ml-6 lg:ml-10 border-2 w-12 md:w-14 lg:w-20 rounded text-center border-black hover:underline"
        activeClassName="bg-black text-white"
      />
    </>
  );
}

export default PaginatedCards;

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ProjectCards from "./ProjectCards";

function PaginatedCards({ projectsPerPage, projects }) {
  const [projectOffset, setProjectOffset] = useState(0);

  if (!projects) {
    return null; 
  }

  const endOffset = projectOffset + projectsPerPage;
  const currentProjects = projects.slice(projectOffset, endOffset);
  const pageCount = Math.ceil(projects.length / projectsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * projectsPerPage) % projects.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setProjectOffset(newOffset);
  };

  return (
    <>
      <ProjectCards currentProjects={currentProjects} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName='flex gap-3 border-2 border-home-gold text-lg mb-5'
        pageClassName = 'text-home-gold '
        previousClassName = 'text-home-gold'
        nextClassName = 'text-home-gold'
        activeClassName = 'text-white'
      />
    </>
  );
}

export default PaginatedCards;

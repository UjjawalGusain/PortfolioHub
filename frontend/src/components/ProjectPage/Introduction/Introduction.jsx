import React from 'react'

function Introduction({project}) {
  console.log(project);
  return (
    <>
        <h2 className="text-3xl">Introduction</h2>
        <div className="py-3">
          <p>{project.description}</p>
        </div>
        <div className="w-full h-72">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-72 mb-4"
          />
        </div>
    </>
  )
}

export default Introduction
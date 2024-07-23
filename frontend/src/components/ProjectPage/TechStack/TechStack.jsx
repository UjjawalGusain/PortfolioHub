import React from 'react'

function TechStack({project}) {
  return (
    <>
        {project.techStack.length > 0 && (
          <div className="my-10">
            <h2 className="text-xl font-bold mb-5">Project Tech Stack</h2>
            <div className="flex flex-wrap">
              {project.techStack.map((tech, index) => (
                <div
                  key={index}
                  className="tech-item bg-gray-200 p-2 rounded-lg m-2"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  )
}

export default TechStack
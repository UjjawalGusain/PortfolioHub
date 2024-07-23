import React from 'react'

function Images({project}) {
  return (
    <>
        {project.images.length > 0 && (
          <div className="my-10">
            <h2 className="text-xl font-bold mb-5">Project Images</h2>
            <div className="flex flex-wrap">
              {project.images.map((image, index) => (
                <a
                key={index}
                href={image}
                target="_blank"
                rel="noopener noreferrer"
                className='max-w-[45%] p-5 h-auto mb-4 cursor-pointer'
              >
                <img
                  src={image}
                  alt={`Project Image ${index + 1}`}
                />
              </a>
              ))}
            </div>
          </div>
        )}
    </>
  )
}

export default Images
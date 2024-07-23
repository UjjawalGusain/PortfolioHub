import React from 'react'

function Videos({project}) {
  return (
    <>
        {project.videos.length > 0 && (
          <div className="my-10">
            <h2 className="text-xl font-bold mb-5">Project Videos</h2>
            <div className="flex flex-wrap">
              {project.videos.map((video, index) => (
                <video
                  key={index}
                  src={video}
                  controls
                  alt={`Project Video ${index + 1}`}
                  className="w-full h-96 mb-4"
                />
              ))}
            </div>
          </div>
        )}
    </>
  )
}

export default Videos
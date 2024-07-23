import React from "react";

function Owners({ project }) {
  const handleOwnerClick = (username) => {
    const url = `/user/${username}/home`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      {project.owners.length > 0 && (
        <div className="my-10">
          <h2 className="text-xl font-bold mb-5">Owners</h2>
          <div className="flex flex-wrap gap-5">
            {project.owners.map((owner, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 py-2 px-3 rounded-lg shadow-md cursor-pointer w-fit"
                onClick={() => handleOwnerClick(owner.username)}
              >
                <img
                  src={owner.profilePic}
                  alt={`${owner.fullname} index: ${index}`}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 mr-4"
                />
                <div>
                  <p className="text-lg font-semibold mb-1">{owner.fullname}</p>
                  <p className="text-xs font-extralight text-gray-600">
                    @{owner.username}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Owners;

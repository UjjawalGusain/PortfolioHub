import React from "react";
import { FaPlusSquare } from "react-icons/fa";

function NoCertificationCard({
  setAddCertificationVisible,
  isUserAuthenticated,
}

)
{

console.log(isUserAuthenticated);

  return (
    <div className="flex w-full h-full justify-center items-center p-28">
      <div className="flex flex-col justify-center items-center gap-6 p-6 w-80 h-80 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-semibold text-gray-700">
            {isUserAuthenticated ? "No Certificates?" : "Sorry"}
          </h1>
          <h2 className="text-xl font-medium text-gray-500">
            {isUserAuthenticated
              ? "Add one right now"
              : "Will be uploading the certificates shortly"}
          </h2>
        </div>
        <div className="flex justify-center items-center mt-4">
          {isUserAuthenticated ? (
            <button
              className="bg-button-red text-white rounded-full p-4 hover:bg-white hover:text-button-red border-2 border-button-red transition-colors duration-300 ease-in-out"
              onClick={() => {
                setAddCertificationVisible(true);
              }}
            >
              <FaPlusSquare className="w-8 h-8" />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoCertificationCard;

import React from "react";
import { CiSquarePlus } from "react-icons/ci";

function NoProjectCard() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col w-72 h-72 border border-home-gold rounded-2xl items-center justify-center bg-gray-800 bg-opacity-75 shadow-lg transition-transform duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-center text-3xl text-white font-bold cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
            No Project? Add a New Project Right Now
          </h1>
          <button className="flex items-center justify-center bg-home-gold p-3 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95 shadow-md hover:shadow-lg">
            <CiSquarePlus className="text-white text-6xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoProjectCard;

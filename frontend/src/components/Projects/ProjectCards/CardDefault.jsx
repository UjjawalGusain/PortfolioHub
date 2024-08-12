import React, { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { USER_ENDPOINTS } from "../../../services/apiService";
import ConfirmationPopup from "./ConfirmationPopup/ConfirmationPopup";

TimeAgo.addLocale(en);

const CardDefault = ({ project, isUserAuthenticate }) => {
  const { thumbnail, name, description, updatedAt, _id } = project;
  const [timeAgo, setTimeAgo] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleProjectClick = () => {
    navigate(`${name}/`);
  };

  const handleProjectDelete = async () => {
    try {
      const response = await axios.post(
        USER_ENDPOINTS.DELETE_PROJECT,
        { projectId: _id },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Project deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  useEffect(() => {
    const timeAgoInstance = new TimeAgo("en-US");
    const formattedTime = timeAgoInstance.format(new Date(updatedAt));

    setTimeAgo(formattedTime);
  }, [updatedAt]);

  return (
    <div className="flex flex-col lg:flex-row w-full md:w-3/5 h-full bg-home-white py-5 md:py-10 border-b-2 border-black justify-center items-center px-4 md:px-0 ">
      <img className="hidden lg:flex h-1/3 md:h-1/2 w-full md:w-2/3 lg:h-1/3 lg:w-1/4 rounded-md object-cover" src={thumbnail} alt="" />
      <div className="w-full md:w-2/3 h-full flex flex-col justify-start  px-2 md:px-4 gap-4">
        <h1 className="text-xl md:text-2xl font-bold">{name}</h1>
        <p className="text-xs text-white bg-text-blue p-1 w-full">
          Last updated {timeAgo}
        </p>
        <div className="flex w-full justify-center items-center">
        <img className="lg:hidden h-1/3 md:h-1/2 w-full md:w-2/3 lg:h-1/3 lg:w-1/4 rounded-md object-cover" src={thumbnail} alt="" />
        </div>
        <p className="text-black font-normal font-sans text-sm md:text-md">
          {description}
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <button
            className="text-black text-start bg-button-red hover:bg-home-white hover:border-button-red border-2 w-full md:w-auto px-3 py-1 justify-center items-center flex"
            onClick={handleProjectClick}
          >
            Let's see the project!
          </button>
          {isUserAuthenticate && (
            <button
              className="rounded text-black text-start text-2xl md:text-3xl bg-red-500 hover:bg-home-white hover:border-red-500 border-2 w-full md:w-auto px-3 py-1 mt-4 md:mt-0 justify-center items-center flex"
              onClick={() => setIsPopupOpen(true)}
            >
              <MdOutlineDeleteOutline />
            </button>
          )}
        </div>
      </div>
      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        deleteObject={"project"}
        onConfirm={() => {
          handleProjectDelete();
          setIsPopupOpen(false);
        }}
      />
    </div>
  );
};

export default CardDefault;

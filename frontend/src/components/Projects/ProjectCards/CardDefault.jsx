import React, { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { USER_ENDPOINTS } from "../../../services/apiService";
import ConfirmationPopup from "./ConfirmationPopup/ConfirmationPopup";

TimeAgo.addLocale(en);

const CardDefault = ({ project }) => {
  const { thumbnail, name, description, updatedAt, _id } = project;
  const { username } = useParams();
  const [authUsername, setAuthUsername] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.post(
          USER_ENDPOINTS.FETCH_USER_DATA,
          {},
          {
            withCredentials: true,
          }
        );
        setAuthUsername(response.data.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsername();
  }, []);

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

  const isAuthUser = authUsername === username;

  return (
    <div className="flex w-3/5 h-full bg-home-white py-10 border-b-2 border-black justify-center items-center">
      <img className="h-1/4 w-1/3 rounded-md" src={thumbnail} alt="" />
      <div className="w-2/3 h-full flex flex-col justify-start px-2 gap-4">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-xs text-white bg-text-blue p-1 w-full">
          Last updated {timeAgo}
        </p>
        <p className="text-black font-normal font-sans text-md">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <button
            className="text-black text-start bg-button-red hover:bg-home-white hover:border-button-red border-2 w-fit px-3 py-1"
            onClick={handleProjectClick}
          >
            Let's see the project!
          </button>
          {isAuthUser && (
            <button
              className="rounded text-black text-start text-3xl bg-red-500 hover:bg-home-white hover:border-red-500 border-2 w-fit px-3 py-1"
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

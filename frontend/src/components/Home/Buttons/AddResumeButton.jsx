import React, { useRef, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { USER_ENDPOINTS } from "../../../services/apiService";

const AddResumeButton = ({ userData, handleResumeUploaded }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddResumeClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("resume", file);

      try {
        await axios.post(USER_ENDPOINTS.ADD_RESUME, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        console.log("Resume uploaded successfully");
        if (handleResumeUploaded) {
          handleResumeUploaded(); 
        }
      } catch (uploadError) {
        console.error("Error uploading resume:", uploadError);
        setError("Error uploading resume. Please try again.");
      } finally {
        setUploading(false);
      }
    } else {
      setError("Please upload a PDF file.");
    }
  };

  return (
    <>
      <button
        className="bg-button-red text-white flex px-3 py-1 rounded-sm border-2 hover:bg-home-white hover:text-button-red hover:border-button-red"
        onClick={handleAddResumeClick}
      >
        {userData.resume ? "Update" : "Add"} Resume <IoMdAddCircle className="relative top-1 ml-5" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="application/pdf"
        onChange={handleFileChange}
      />
      {fileName && <p>Uploaded File: {fileName}</p>}
      {uploading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default AddResumeButton;

import React, { useState } from "react";
import AddCertification from "./AddCertification/AddCertification";
import { USER_ENDPOINTS } from "../../services/apiService";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ConfirmationPopup from "../Projects/ProjectCards/ConfirmationPopup/ConfirmationPopup";
import NoCertificationCard from "./NoCertification/NoCertificationCard";
import useFetchAllData from "../../hooks/useFetchAllData";
import { useSelector } from "react-redux";

function Certifications() {
  const [addCertificationVisible, setAddCertificationVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredCert, setHoveredCert] = useState(null);

  const { loading, error, isUserAuthenticated, username } = useFetchAllData();
  const certifications = useSelector((state) => state.certificates?.certificates);

  const handleAddCertification = () => {
    setAddCertificationVisible(true);
  };

  const handleCertClick = (cert) => {
    setSelectedCert(cert);
  };

  const handleCertificateDelete = async () => {
    try {
      if (!selectedCert) {
        console.error("No certificate selected for deletion.");
        return;
      }

      await axios.post(USER_ENDPOINTS.DELETE_CERTIFICATION, {
        certificationId: selectedCert._id,
      });

      setSelectedCert(null);
    } catch (error) {
      console.error("Error deleting certification:", error);
      setError("Error deleting certification.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const displayCert = selectedCert || hoveredCert;

  if (certifications && certifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        {addCertificationVisible ? (
          <AddCertification setAddCertificationVisible={setAddCertificationVisible} />
        ) : (
          <div className="flex flex-col items-center">
            <NoCertificationCard setAddCertificationVisible={setAddCertificationVisible} isUserAuthenticated={isUserAuthenticated} />
            {isUserAuthenticated && !addCertificationVisible && (
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-button-red text-home-white rounded-lg hover:bg-home-white hover:text-button-red hover:border-button-red border-2 transition-colors duration-300 ease-in-out"
                onClick={handleAddCertification}
              >
                Add New Certificate
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="my-8 w-full flex flex-col md:flex-row justify-center items-start p-4">
      {addCertificationVisible ? (
        <AddCertification setAddCertificationVisible={setAddCertificationVisible} />
      ) : (
        <div className={`flex flex-col md:flex-row h-full w-full md:w-2/3 lg:w-3/4 border-2 border-gray-300 rounded-lg shadow-lg transition-all duration-300`}>
          <div className="w-full md:w-1/3 flex flex-col gap-6 p-4 md:p-6 bg-gray-100 border-b md:border-b-0 md:border-r border-gray-300">
            <h1 className="text-3xl md:text-4xl font-bold text-text-blue mb-4 text-center md:text-left">Certifications</h1>
            {certifications && certifications.map((cert) => (
              <button
                key={cert._id}
                className={`w-full text-left p-2 text-base bg-gray-100 shadow-gray-100 shadow-md rounded-lg mb-2 font-semibold text-text-blue transition-colors duration-300 ease-in-out ${selectedCert === cert || hoveredCert === cert ? 'bg-gray-200 text-button-red' : ''}`}
                onClick={() => handleCertClick(cert)}
                onMouseEnter={() => setHoveredCert(cert)}
                onMouseLeave={() => setHoveredCert(null)}
              >
                {cert.title}
              </button>
            ))}
          </div>
          <div className="w-full md:w-2/3 flex flex-col p-4 md:p-6 bg-home-white relative">
            {displayCert ? (
              <div className="flex flex-col">
                <h2 className="text-2xl md:text-3xl font-semibold text-text-blue">{displayCert.title}</h2>
                <p className="text-gray-700 mt-3 text-base md:text-lg">{displayCert.description}</p>
                {displayCert.certificateImg && (
                  <img
                    src={displayCert.certificateImg}
                    alt={displayCert.title}
                    className="mt-4 max-w-full rounded-lg shadow-md"
                  />
                )}
                {isUserAuthenticated && (
                  <button
                    className="rounded text-black text-start text-2xl md:text-3xl bg-red-500 hover:bg-home-white hover:border-red-500 border-2 px-3 py-1 absolute right-4 bottom-4 transition-colors duration-300 ease-in-out"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-base md:text-lg flex justify-center items-center w-full h-full">
                Click on a title to see details
              </p>
            )}
          </div>
        </div>
      )}

      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        deleteObject="certificate"
        onConfirm={() => {
          handleCertificateDelete();
          setIsPopupOpen(false);
        }}
      />

      {isUserAuthenticated && !addCertificationVisible && (
        <button
          type="button"
          className="fixed bottom-4 left-4 px-4 py-2 bg-button-red text-home-white rounded-lg hover:bg-home-white hover:text-button-red hover:border-button-red border-2 transition-colors duration-300 ease-in-out"
          onClick={handleAddCertification}
        >
          Add New Certificate
        </button>
      )}
    </div>
  );
}

export default Certifications;

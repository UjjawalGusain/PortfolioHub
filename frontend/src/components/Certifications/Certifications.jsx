import React, { useEffect, useState } from "react";
import AddCertification from "./AddCertification/AddCertification";
import { USER_ENDPOINTS } from "../../services/apiService";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ConfirmationPopup from "../Projects/ProjectCards/ConfirmationPopup/ConfirmationPopup";

function Certifications() {
  const [addCertificationVisible, setAddCertificationVisible] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCert, setHoveredCert] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [authUsername, setAuthUsername] = useState("");

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

  const handleAddCertification = () => {
    setAddCertificationVisible(true);
  };

  const handleCertHover = (cert) => {
    setHoveredCert(cert);
  };

  const handleCertLeave = () => {
    if (!selectedCert) {
      setHoveredCert(null);
    }
  };

  const handleCertClick = (cert) => {
    setSelectedCert(cert);
    setHoveredCert(null);
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

      setCertifications(
        certifications.filter((cert) => cert._id !== selectedCert._id)
      );
      setSelectedCert(null);
    } catch (error) {
      console.error("Error deleting certification:", error);
      setError("Error deleting certification.");
    }
  };

  const { username } = useParams();

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          USER_ENDPOINTS.FETCH_CERTIFICATIONS.replace(":username", username)
        );
        console.log(response);
        setCertifications(response.data.data);
      } catch (error) {
        setError("Error fetching certifications.");
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const displayCert = hoveredCert || selectedCert;

  const isUserAuthenticated = username === authUsername;

  return (
    <div className="my-8 w-full h-full flex flex-col md:flex-row justify-center items-start">
      {addCertificationVisible ? (
        <AddCertification
          setAddCertificationVisible={setAddCertificationVisible}
        />
      ) : (
        <div
          className={`h-full w-1/2 border-2 border-gray-300 flex flex-col md:flex-row rounded-lg shadow-lg transition-all duration-300`}
        >
          <div className="w-1/2 flex flex-col gap-6 p-6 bg-gray-100 border-r border-gray-300">
            <h1 className="text-4xl font-bold text-text-blue mb-4">
              Certifications
            </h1>
            {certifications.map((cert) => (
              <button
                key={cert._id}
                className="w-full text-left p-2 text-base bg-gray-100 shadow-gray-100 shadow-md rounded-lg mb-2 font-semibold text-text-blue hover:bg-gray-200 hover:text-button-red transition-colors duration-300"
                onMouseEnter={() => handleCertHover(cert)}
                onMouseLeave={handleCertLeave}
                onClick={() => handleCertClick(cert)}
              >
                {cert.title}
              </button>
            ))}
          </div>
          <div className="w-full flex flex-col p-6 bg-home-white relative">
            {displayCert ? (
              <div className="flex flex-col">
                <h2 className="text-3xl font-semibold text-text-blue">
                  {displayCert.title}
                </h2>
                <p className="text-gray-700 mt-3 text-lg">
                  {displayCert.description}
                </p>
                {displayCert.certificateImg && (
                  <img
                    src={displayCert.certificateImg}
                    alt={displayCert.title}
                    className="mt-4 max-w-full rounded-lg shadow-md w-full h-full"
                  />
                )}
                {isUserAuthenticated && (
                  <button
                    className="rounded text-black text-start text-3xl bg-red-500 hover:bg-home-white hover:border-red-500 border-2 px-3 py-1 absolute right-4 bottom-4"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-lg flex justify-center items-center w-full h-full">
                Hover over or click on a title to see details
              </p>
            )}
          </div>
        </div>
      )}

      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        deleteObject={"certificate"}
        onConfirm={() => {
          handleCertificateDelete();
          setIsPopupOpen(false);
        }}
      />

      {isUserAuthenticated && !addCertificationVisible && (
        <button
          type="submit"
          className="absolute bottom-4 left-4 px-4 py-2 bg-button-red text-home-white rounded-lg hover:bg-home-white hover:text-button-red hover:border-button-red border-2"
          onClick={handleAddCertification}
        >
          Add New Certificate
        </button>
      )}
    </div>
  );
}

export default Certifications;

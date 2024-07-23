import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProjectCard from "./AddProjectDetails/AddProjectCard";
import PaginatedCards from "./ProjectCards/PaginatedCards";
import { USER_ENDPOINTS } from "../../services/apiService";
import { useParams } from "react-router-dom";
import ScrollToTopButton from "./ScrollToTopButton/ScrollToTopButton";

export default function Projects() {
  const { username } = useParams();
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddProjectClick = () => {
    setShowAddProject(true);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          USER_ENDPOINTS.FETCH_USER_PROJECTS.replace(":username", username)
        );
        console.log(response);
        setProjects(response.data.data.projectObjects); // Adjust based on your response structure
      } catch (error) {
        setError("Error fetching projects.");
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div
      id="projects"
      className="h-full w-full bg-home-white flex flex-col items-center text-black relative p-5"
    >
      <h1 className="text-4xl font-bold text-text-blue w-3/5 text-left ">
        Projects
      </h1>

      <ScrollToTopButton />

      {showAddProject ? (
        <AddProjectCard setShowAddProject={setShowAddProject} />
      ) : (
        <PaginatedCards
          projectsPerPage={4}
          projects={projects}
          handleAddProjectClick={handleAddProjectClick}
        />
      )}
      {!showAddProject ? (
        <button
          className="fixed bottom-4 left-4 border-2 rounded px-5 py-2 bg-button-red hover:bg-home-white hover:border-button-red z-30"
          onClick={handleAddProjectClick}
        >
          Add Project
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

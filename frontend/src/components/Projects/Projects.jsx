import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProjectCard from "./AddProjectCard";
import PaginatedCards from "./ProjectCards/PaginatedCards";
import { USER_ENDPOINTS } from "../../services/apiService";
import { useParams } from "react-router-dom";

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
          USER_ENDPOINTS.FETCH_USER_PROJECTS.replace(':username', username)
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
    <div className="h-screen w-full bg-home-black flex flex-col items-center text-white">
      {showAddProject ? (
        <AddProjectCard setShowAddProject={setShowAddProject} />
      ) : (
        <PaginatedCards
          projectsPerPage={6}
          projects={projects}
          handleAddProjectClick={handleAddProjectClick}
        />
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_ENDPOINTS } from "../../services/apiService";
import { useParams } from "react-router-dom";

function ProjectPage() {
  const { username, projectName } = useParams();
  const pathUsername = username;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          USER_ENDPOINTS.FETCH_PROJECT.replace(":username", pathUsername).replace(":projectName", projectName)
        );
        setProject(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setError("Error fetching project.");
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [pathUsername, projectName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <p className="text-lg mb-4">{project.description}</p>
      
      <div className="mb-4">
        <img src={project.thumbnail} alt={project.name} className="w-full h-auto mb-4"/>
      </div>
      
      {project.images.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Images</h2>
          <div className="flex flex-wrap">
            {project.images.map((image, index) => (
              <img key={index} src={image} alt={`Project Image ${index + 1}`} className="w-1/3 p-1"/>
            ))}
          </div>
        </div>
      )}
      
      {project.videos.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Videos</h2>
          <div className="flex flex-wrap">
            {project.videos.map((video, index) => (
              <video key={index} src={video} controls className="w-1/3 p-1"/>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Project URL</h2>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          {project.url}
        </a>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Domain</h2>
        <p>{project.domain}</p>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Tech Stack</h2>
        <ul className="list-disc list-inside">
          {project.techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Stars</h2>
        <p>{project.stars}</p>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Owners</h2>
        <div className="flex flex-wrap">
          {project.owners.map((owner) => (
            <div key={owner._id} className="w-1/3 p-2">
              <img src={owner.profilePic} alt={owner.username} className="w-full h-auto mb-2 rounded-full"/>
              <p className="font-bold">{owner.fullname}</p>
              <p>@{owner.username}</p>
              <p>{owner.email}</p>
              <a href={`https://github.com/${owner.githubId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                GitHub Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;

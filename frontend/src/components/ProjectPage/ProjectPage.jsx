import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_ENDPOINTS } from "../../services/apiService";
import { useParams } from "react-router-dom";
import Introduction from "./Introduction/Introduction";
import Images from "./Images/Images";
import Videos from "./Videos/Videos";
import TechStack from "./TechStack/TechStack";
import Owners from "./Owners/Owners";
import CheckOut from "./Buttons/CheckOut";
import StarRating from "./StarRating/StarRating";
import Title from "./Title/Title";

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
          USER_ENDPOINTS.FETCH_PROJECT.replace(
            ":username",
            pathUsername
          ).replace(":projectName", projectName)
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
    <div className="h-full bg-home-white flex justify-center p-10">
      <div className="w-3/5">
        <Title project={project} />
        <Introduction project={project}/>
        <Images project={project} />
        <Videos project={project} />
        <TechStack project={project} />
        <Owners project={project} />
        <CheckOut project={project} />
        <StarRating project={project} />
      </div>
    </div>
  );
}

export default ProjectPage;
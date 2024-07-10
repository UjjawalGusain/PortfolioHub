// https://api.github.com/users/UjjawalGusain

import axios from "axios";

const fetchGithubData = async (githubId) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${githubId}`);
      return res.data; // Return only the data part of the response
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      throw error; // Propagate the error to handle it in the component
    }
  };
  
  const fetchGithubRepos = async (githubId) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${githubId}/repos`);
      return res.data; // Return only the data part of the response
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      throw error; // Propagate the error to handle it in the component
    }
  };

export {fetchGithubData, fetchGithubRepos}
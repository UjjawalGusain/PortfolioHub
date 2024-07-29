import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGithubData } from "../../api/githubApi";

export const fetchGithub = createAsyncThunk("fetchGithub", async (userData) => {
    try {
        if (userData && userData.githubId) {
          const data = await fetchGithubData(userData.githubId);
          return data;
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
})
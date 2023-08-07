import axios from "axios";
import config from "./../config/config";

export const API_BASE_URL = "http://localhost:3100/api";

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

const handleApiError = (error) => {
  console.error("API error:", error.message);
  throw error;
};

export const loadTags = async () => {
  try {
    const response = await api.get("/tags");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addTag = async (tagName) => {
  try {
    const response = await api.post("/tags", { name: tagName });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const editTag = async (tagId, tagName) => {
  try {
    const response = await api.put(`/tags/${tagId}`, { name: tagName });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteTag = async (tagId) => {
  try {
    const response = await api.delete(`/tags/${tagId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

import axios from "axios";

const axiosConfig = {
  baseURL: import.meta.env.VITE_API_APP_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(axiosConfig);
export default api;

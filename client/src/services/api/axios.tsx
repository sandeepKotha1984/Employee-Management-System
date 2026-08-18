import axios from "axios";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

const api = axios.create({
  baseURL: apiBaseUrl ? `${apiBaseUrl}/api` : "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

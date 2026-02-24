import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel API base
  withCredentials: true, // needed later for auth
});

export default api;

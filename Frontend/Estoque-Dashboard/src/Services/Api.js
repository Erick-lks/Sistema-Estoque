import axios, { Axios } from "axios";

const api = axios.create({
  baseURL: "https://sistema-estoque-rtj9.onrender.com",
  
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;

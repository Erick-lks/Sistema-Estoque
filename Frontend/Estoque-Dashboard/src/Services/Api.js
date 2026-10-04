import axios, { Axios } from "axios";

const api = axios.create({
  baseURL: "https://sistema-estoque-8p4a.onrender.com",
  
 baseURL:  `http://localhost:8081` ,

});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;

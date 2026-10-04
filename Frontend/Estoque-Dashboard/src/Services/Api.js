import axios, { Axios } from "axios";

const api = axios.create({
  baseURL: "https://sistema-estoque-8p4a.onrender.com",
  
 baseURL:  `http://localhost:8081` 
});

export default api;

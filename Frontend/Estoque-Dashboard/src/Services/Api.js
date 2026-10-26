import axios, { Axios } from "axios";


const api = axios.create({
   baseURL: "https://sistema-estoque-rtj9.onrender.com",
   //baseURL:"http://localhost:8081",


    withCredentials: true
});

export default api;



import axios, { Axios } from "axios";


const api = axios.create({
   baseURL: "https://sistema-estoque-rtj9.onrender.com",


    withCredentials: true
});

export default api;



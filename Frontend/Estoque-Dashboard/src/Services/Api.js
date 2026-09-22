import axios, { Axios } from "axios";

const api = axios.create({
 // baseURL:  `http://localhost:8081` ,//
    baseURL:  `https://sistema-estoque-8p4a.onrender.com` 

});

export default api;

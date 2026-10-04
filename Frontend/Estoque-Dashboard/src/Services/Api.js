import axios, { Axios } from "axios";

const api = axios.create({
<<<<<<< Updated upstream
  baseURL: "https://sistema-estoque-8p4a.onrender.com",
  
=======
 baseURL:  `http://localhost:8081` ,
   /* baseURL:  `https://sistema-estoque-8p4a.onrender.com` */

>>>>>>> Stashed changes
});

export default api;

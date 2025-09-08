import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const apiRequest = user => axios.post(`${apiUrl}/api/login`,user,{
withCredentials: true
});
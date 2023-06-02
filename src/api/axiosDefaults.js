import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.baseURL = "https://organisation-app-api.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create(); // intercepts the request
export const axiosRes = axios.create(); // intercepts the response

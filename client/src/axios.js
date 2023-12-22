import axios from "axios";

const url=process.env.URL;
export const makeRequest = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  credentials: 'include',
});
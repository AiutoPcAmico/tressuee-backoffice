import axios from "axios";

const instance = axios.create({
  // .. where we make our configurations
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "api-key": process.env.REACT_APP_API_KEY,
  },
});

export default instance;

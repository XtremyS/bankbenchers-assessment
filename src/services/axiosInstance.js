import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_BACKEND_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Testing Error", error);
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.log("Bad Request");
          break;
        case 401:
          console.log("Unauthorized");
          break;
        case 403:
          console.log("Forbidden");
          break;
        case 404:
          console.log("Not Found");
          break;
        case 500:
          console.log("Internal Server Error");
          break;
        default:
          console.log("Error", error.response.status);
      }
    } else if (error.request) {
      console.log("No response received");
    } else {
      console.log("Request error", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

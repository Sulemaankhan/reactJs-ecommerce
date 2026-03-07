import axios from "axios";

// Use API gateway only. Direct backend (1010) causes CORS and wrong response format.
const baseURL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:7777";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Turn network/CORS errors into a readable message (browser hides real cause for security)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      const url = error.config?.baseURL || baseURL;
      error.message =
        "Cannot reach the API. Check that the API gateway is running at " +
        url +
        " and CORS is allowed for this origin.";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;   
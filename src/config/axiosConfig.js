import axios from "axios";

// Default: route through API gateway (7777). For direct backend set REACT_APP_API_BASE_URL=http://localhost:1010
const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:7777";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;   
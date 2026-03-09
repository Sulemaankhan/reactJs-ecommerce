import axios from "axios";

const GATEWAY_PORT = 7777;

// Match gateway host to app origin to avoid CORS (localhost with localhost, 127.0.0.1 with 127.0.0.1)
function getDefaultBaseURL() {
  if (typeof window !== "undefined" && window.location?.hostname) {
    const host = window.location.hostname;
    return `http://${host}:${GATEWAY_PORT}`;
  }
  return `http://localhost:${GATEWAY_PORT}`;
}

// In development, use empty baseURL so CRA proxies requests to the gateway (avoids CORS).
const baseURL =
  process.env.NODE_ENV === "development"
    ? ""
    : process.env.REACT_APP_API_BASE_URL || getDefaultBaseURL();

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_STORAGE_KEY = "product-app-auth";

axiosInstance.interceptors.request.use((config) => {
  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const token = parsed?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (e) {
    // ignore
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      error.message =
        `Cannot reach the API. Start the API gateway on port ${GATEWAY_PORT} (e.g. http://localhost:${GATEWAY_PORT} or http://127.0.0.1:${GATEWAY_PORT}).`;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;   
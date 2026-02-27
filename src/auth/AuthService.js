import axiosInstance from "../config/axiosConfig";

export async function loginApi(credentials) {
  try {
    const response = await axiosInstance.post("/api/auth/signin", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
}


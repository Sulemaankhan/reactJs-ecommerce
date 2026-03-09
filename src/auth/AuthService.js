import axiosInstance from "../config/axiosConfig";

const AUTH_BASE = "/shopping-service/users";

export async function loginApi(credentials) {
  const response = await axiosInstance.post(`${AUTH_BASE}/login`, {
    userName: credentials.username,
    password: credentials.password,
  });
  const data = response.data && typeof response.data === "object" ? response.data : {};
  // Accept both: new { token, user } or old { userName, message }
  const user = data.user
    ? {
        ...data.user,
        username: data.user.userName ?? data.user.username,
        role: data.user.role ?? data.role ?? "USER",
      }
    : {
        username: data.userName ?? credentials.username,
        id: data.user?.id ?? data.id,
        role: data.role ?? "USER",
      };
  return {
    token: data.token ?? null,
    user,
  };
}

export async function registerApi(credentials) {
  const response = await axiosInstance.post(`${AUTH_BASE}/register`, {
    userName: credentials.userName,
    password: credentials.password,
    firstName: credentials.firstName,
    lastName: credentials.lastName,
    emailId: credentials.emailId,
    mobileNumber: credentials.mobileNumber,
  });
  const data = response.data;
  return {
    token: data.token,
    user: data.user
      ? {
          ...data.user,
          username: data.user.userName,
          role: data.user.role ?? data.role ?? "USER",
        }
      : {
          username: credentials.userName,
          role: data.role ?? "USER",
        },
  };
}


import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "./config/axiosConfig";

const AuthContext = createContext(null);

const STORAGE_KEY = "product-app-auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) {
          setUser(parsed.user || null);
          setToken(parsed.token || null);
          if (parsed.token) {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
          }
        }
      }
    } catch (e) {
      console.error("Failed to read auth from storage", e);
    }
  }, []);

  useEffect(() => {
    try {
      if (!user && !token) {
        window.localStorage.removeItem(STORAGE_KEY);
        delete axiosInstance.defaults.headers.common["Authorization"];
        return;
      }
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user, token })
      );
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
      }
    } catch (e) {
      console.error("Failed to persist auth", e);
    }
  }, [user, token]);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!(user || token),
      isAdmin: !!(user && user.role === "ADMIN"),
      login,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}


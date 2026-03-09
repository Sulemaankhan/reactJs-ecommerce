import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import { registerApi } from "../../../auth/AuthService";

export default function UserRegistration() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    mobileNumber: "",
    userName: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setSubmitting(true);
    try {
      const data = await registerApi(form);
      login(
        data.user ? { ...data.user, username: data.user.userName } : { username: form.userName },
        data.token
      );
      setSuccess("Registration successful. Redirecting...");
      setForm({
        firstName: "",
        lastName: "",
        emailId: "",
        mobileNumber: "",
        userName: "",
        password: "",
      });
      setTimeout(() => navigate("/shop", { replace: true }), 1000);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          User Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="given-name"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="family-name"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="emailId"
            type="email"
            value={form.emailId}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="email"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={form.mobileNumber}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="tel"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Username"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="username"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="new-password"
            size="small"
            sx={{ mb: 2 }}
          />
          {success && (
            <Typography color="success.main" variant="body2" sx={{ mb: 1 }}>
              {success}
            </Typography>
          )}
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}


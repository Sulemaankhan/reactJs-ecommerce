import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "../../../config/axiosConfig";

export default function UserRegistration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
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
      // Adjust backend URL/path and payload structure as needed
      await axiosInstance.post("/api/auth/signup", form);
      setSuccess("Registration successful.");
      setForm({ name: "", email: "", mobile: "", address: "" });
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
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mobile number"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
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


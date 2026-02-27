import React from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

// For now this is a read-only view using example data.
// Later you can load real user data from your backend.
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  mobile: "+91-9999999999",
  address: "123 Main Street, City, Country",
};

export default function UserAccount() {
  const user = mockUser;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          User Account
        </Typography>
        <Box component="div">
          <TextField
            label="Name"
            value={user.name}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Email"
            value={user.email}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Mobile number"
            value={user.mobile}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Address"
            value={user.address}
            fullWidth
            multiline
            rows={3}
            size="small"
            sx={{ mb: 2 }}
            InputProps={{ readOnly: true }}
          />
        </Box>
      </Paper>
    </Container>
  );
}


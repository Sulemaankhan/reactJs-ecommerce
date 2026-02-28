import React, { useState } from "react";
import {
  Box,
  Container,
  Tab,
  Tabs,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import OrderList from "../orders/index";

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  mobile: "+91-9999999999",
  address: "123 Main Street, City, Country",
};

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function UserAccount() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const user = mockUser;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 5 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        My Account
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "grey.50",
            px: 2,
          }}
        >
          <Tab icon={<PersonIcon />} iconPosition="start" label="Profile" />
          <Tab icon={<ShoppingBagIcon />} iconPosition="start" label="My Orders & Shipment" />
        </Tabs>

        {/* Profile Tab */}
        <TabPanel value={tab} index={0}>
          <Box sx={{ px: 4, pb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Personal Information
            </Typography>
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
              sx={{ mb: 3 }}
              InputProps={{ readOnly: true }}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate("/user/register")}
            >
              Update Profile
            </Button>
          </Box>
        </TabPanel>

        {/* Orders & Shipment Tab */}
        <TabPanel value={tab} index={1}>
          <OrderList embedded />
        </TabPanel>
      </Paper>
    </Container>
  );
}

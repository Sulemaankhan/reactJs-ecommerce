import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Card,
    CardContent,
    Button,
    Divider,
    Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";

const shipmentSteps = [
    {
        label: "Order Confirmed",
        description: "Your order has been received and is being processed by our team.",
        icon: <CheckCircleIcon color="success" />,
        time: "Just now",
    },
    {
        label: "Packing",
        description: "Your items are being carefully packed and prepared for dispatch.",
        icon: <InventoryIcon color="primary" />,
        time: "Expected: 1–2 hours",
    },
    {
        label: "Shipped",
        description: "Your package is on its way with our delivery partner.",
        icon: <LocalShippingIcon color="primary" />,
        time: "Expected: 1–2 business days",
    },
    {
        label: "Delivered",
        description: "Your package has been delivered to your address. Enjoy!",
        icon: <HomeIcon color="success" />,
        time: "Expected: 2–3 business days",
    },
];

export default function ShipmentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const totalPrice = location.state?.totalPrice || 0;

    const [activeStep, setActiveStep] = useState(0);

    // Animate progress through step 1 (Packing) automatically
    useEffect(() => {
        const timer = setTimeout(() => setActiveStep(1), 1000);
        return () => clearTimeout(timer);
    }, []);

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
            {/* Success Banner */}
            <Card
                elevation={0}
                sx={{
                    mb: 4,
                    background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
                    borderRadius: 3,
                    border: "1px solid #a5d6a7",
                }}
            >
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <CheckCircleIcon sx={{ fontSize: 64, color: "success.main", mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "success.dark" }}>
                        Payment Successful!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Thank you for your order. We've sent a confirmation to your email.
                    </Typography>
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
                        <Chip label={`Order ID: ${orderId}`} color="success" variant="outlined" />
                        {totalPrice > 0 && (
                            <Chip label={`₹${totalPrice.toFixed(2)} paid`} color="primary" variant="outlined" />
                        )}
                    </Box>
                </CardContent>
            </Card>

            {/* Shipment Steps */}
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                Shipment Tracking
            </Typography>

            <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {shipmentSteps.map((step, index) => (
                            <Step key={step.label} expanded>
                                <StepLabel
                                    StepIconComponent={() => (
                                        <Box
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                bgcolor: index <= activeStep ? "success.light" : "grey.200",
                                                transition: "background-color 0.5s ease",
                                            }}
                                        >
                                            {step.icon}
                                        </Box>
                                    )}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Typography
                                            sx={{
                                                fontWeight: index <= activeStep ? 700 : 400,
                                                color: index <= activeStep ? "text.primary" : "text.disabled",
                                                transition: "color 0.5s ease",
                                            }}
                                        >
                                            {step.label}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {step.time}
                                        </Typography>
                                    </Box>
                                </StepLabel>
                                <StepContent>
                                    <Typography
                                        variant="body2"
                                        color={index <= activeStep ? "text.secondary" : "text.disabled"}
                                        sx={{ mt: 0.5 }}
                                    >
                                        {step.description}
                                    </Typography>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </CardContent>
            </Card>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate("/")}
                    sx={{ py: 1.5, fontWeight: "bold", borderRadius: 2 }}
                >
                    Continue Shopping
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/user/account")}
                    sx={{ py: 1.5, borderRadius: 2 }}
                >
                    My Orders
                </Button>
            </Box>
        </Container>
    );
}

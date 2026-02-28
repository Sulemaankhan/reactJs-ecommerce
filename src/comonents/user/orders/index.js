import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    Card,
    Chip,
    Divider,
    Grid,
    Button,
    Stepper,
    Step,
    StepLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const statusColor = {
    Delivered: "success",
    Shipped: "primary",
    Packing: "warning",
    Confirmed: "info",
};

const shipmentStepLabels = ["Order Confirmed", "Packing", "Shipped", "Delivered"];
const shipmentStepIcons = [
    <CheckCircleIcon fontSize="small" />,
    <InventoryIcon fontSize="small" />,
    <LocalShippingIcon fontSize="small" />,
    <HomeIcon fontSize="small" />,
];

// Mock order data
const mockOrders = [
    {
        id: "ORD-482910",
        date: "28 Feb 2026",
        total: 3499.0,
        status: "Shipped",
        statusStep: 2,
        items: [
            { name: "Classic White Shirt", qty: 2, price: 999 },
            { name: "Black Jeans", qty: 1, price: 1501 },
        ],
    },
    {
        id: "ORD-367124",
        date: "24 Feb 2026",
        total: 1799.0,
        status: "Delivered",
        statusStep: 3,
        items: [
            { name: "Casual Sneakers", qty: 1, price: 1799 },
        ],
    },
    {
        id: "ORD-251083",
        date: "18 Feb 2026",
        total: 5299.0,
        status: "Delivered",
        statusStep: 3,
        items: [
            { name: "Formal Watch", qty: 1, price: 3299 },
            { name: "Leather Belt", qty: 2, price: 1000 },
        ],
    },
];

export default function OrderList({ embedded = false }) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleAccordion = (id) => (_, isExpanded) => {
        setExpanded(isExpanded ? id : false);
    };

    return (
        <Container maxWidth={embedded ? false : "md"} sx={{ mt: embedded ? 0 : 4, mb: embedded ? 0 : 5, px: embedded ? 0 : undefined }}>
            {!embedded && (
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        My Orders
                    </Typography>
                    <Button variant="outlined" size="small" onClick={() => navigate("/shop")}>
                        Continue Shopping
                    </Button>
                </Box>
            )}

            {mockOrders.length === 0 ? (
                <Card elevation={2} sx={{ textAlign: "center", p: 6 }}>
                    <Typography variant="h6" color="text.secondary">
                        You have no orders yet.
                    </Typography>
                </Card>
            ) : (
                mockOrders.map((order) => (
                    <Accordion
                        key={order.id}
                        expanded={expanded === order.id}
                        onChange={handleAccordion(order.id)}
                        elevation={2}
                        sx={{ mb: 2, borderRadius: 2, "&:before": { display: "none" } }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1.5 }}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography sx={{ fontWeight: 700 }}>{order.id}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {order.date}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={4}>
                                    <Typography variant="body2" color="text.secondary">
                                        Total
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600 }}>₹{order.total.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={6} sm={4} sx={{ textAlign: { sm: "right" } }}>
                                    <Chip
                                        label={order.status}
                                        color={statusColor[order.status] || "default"}
                                        size="small"
                                        sx={{ fontWeight: 600 }}
                                    />
                                </Grid>
                            </Grid>
                        </AccordionSummary>

                        <AccordionDetails sx={{ px: 3, pb: 3 }}>
                            {/* Items */}
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                Items
                            </Typography>
                            {order.items.map((item, idx) => (
                                <Box
                                    key={idx}
                                    sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
                                >
                                    <Typography variant="body2">
                                        {item.name} × {item.qty}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        ₹{(item.price * item.qty).toFixed(2)}
                                    </Typography>
                                </Box>
                            ))}

                            <Divider sx={{ my: 2 }} />

                            {/* Shipment Stepper */}
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                                Shipment Status
                            </Typography>
                            <Stepper activeStep={order.statusStep} alternativeLabel>
                                {shipmentStepLabels.map((label, idx) => (
                                    <Step key={label}>
                                        <StepLabel
                                            StepIconComponent={() => (
                                                <Box
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        bgcolor: idx <= order.statusStep ? "primary.main" : "grey.300",
                                                        color: idx <= order.statusStep ? "white" : "grey.500",
                                                        transition: "background-color 0.3s",
                                                    }}
                                                >
                                                    {shipmentStepIcons[idx]}
                                                </Box>
                                            )}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: idx <= order.statusStep ? 700 : 400,
                                                    color: idx <= order.statusStep ? "primary.main" : "text.disabled",
                                                }}
                                            >
                                                {label}
                                            </Typography>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </Container>
    );
}

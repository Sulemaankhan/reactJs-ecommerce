import React, { useState } from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
    Divider,
    Snackbar,
    Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import QrCode2Icon from "@mui/icons-material/QrCode2";

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const totalPrice = location.state?.totalPrice || 0;

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        name: "",
    });

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsProcessing(false);
        setSuccess(true);

        // Redirect to shipment tracking page
        setTimeout(() => {
            navigate("/shipment", { state: { totalPrice } });
        }, 2000);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "primary.main" }}>
                Secure Checkout
            </Typography>

            <Grid container spacing={4}>
                {/* Payment Main Section */}
                <Grid item xs={12} md={8}>
                    <Card elevation={3} sx={{ borderRadius: 2 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                                Select Payment Method
                            </Typography>

                            <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
                                <RadioGroup
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    sx={{ gap: 2 }}
                                >
                                    <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2, display: "flex", alignItems: "center", transition: "0.2s", ...(paymentMethod === "card" && { borderColor: "primary.main", bgcolor: "primary.50" }) }}>
                                        <FormControlLabel
                                            value="card"
                                            control={<Radio />}
                                            label={
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <CreditCardIcon sx={{ mr: 1, color: "text.secondary" }} />
                                                    <Typography sx={{ fontWeight: 500 }}>Credit / Debit Card</Typography>
                                                </Box>
                                            }
                                            sx={{ margin: 0, width: "100%" }}
                                        />
                                    </Box>

                                    <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2, display: "flex", alignItems: "center", transition: "0.2s", ...(paymentMethod === "upi" && { borderColor: "primary.main", bgcolor: "primary.50" }) }}>
                                        <FormControlLabel
                                            value="upi"
                                            control={<Radio />}
                                            label={
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <QrCode2Icon sx={{ mr: 1, color: "text.secondary" }} />
                                                    <Typography sx={{ fontWeight: 500 }}>UPI</Typography>
                                                </Box>
                                            }
                                            sx={{ margin: 0, width: "100%" }}
                                        />
                                    </Box>

                                    <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2, display: "flex", alignItems: "center", transition: "0.2s", ...(paymentMethod === "netbanking" && { borderColor: "primary.main", bgcolor: "primary.50" }) }}>
                                        <FormControlLabel
                                            value="netbanking"
                                            control={<Radio />}
                                            label={
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <AccountBalanceIcon sx={{ mr: 1, color: "text.secondary" }} />
                                                    <Typography sx={{ fontWeight: 500 }}>Net Banking</Typography>
                                                </Box>
                                            }
                                            sx={{ margin: 0, width: "100%" }}
                                        />
                                    </Box>
                                </RadioGroup>
                            </FormControl>

                            <Divider sx={{ mb: 4 }} />

                            <form onSubmit={handlePayment}>
                                {paymentMethod === "card" && (
                                    <Box sx={{ animation: "fadeIn 0.5s ease-in-out" }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                                            Card Details
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Card Number"
                                                    name="cardNumber"
                                                    value={cardDetails.cardNumber}
                                                    onChange={handleCardChange}
                                                    placeholder="0000 0000 0000 0000"
                                                    required
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Expiry Date"
                                                    name="expiry"
                                                    value={cardDetails.expiry}
                                                    onChange={handleCardChange}
                                                    placeholder="MM/YY"
                                                    required
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="CVV"
                                                    name="cvv"
                                                    type="password"
                                                    value={cardDetails.cvv}
                                                    onChange={handleCardChange}
                                                    placeholder="123"
                                                    required
                                                    InputProps={{ inputProps: { maxLength: 4 } }}
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Name on Card"
                                                    name="name"
                                                    value={cardDetails.name}
                                                    onChange={handleCardChange}
                                                    placeholder="John Doe"
                                                    required
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}

                                {paymentMethod === "upi" && (
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                                            UPI Details
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            label="UPI ID"
                                            placeholder="username@bank"
                                            required
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Box>
                                )}

                                {paymentMethod === "netbanking" && (
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                                            Net Banking
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Select Bank"
                                            SelectProps={{ native: true }}
                                            required
                                            InputLabelProps={{ shrink: true }}
                                        >
                                            <option value="">Choose your bank</option>
                                            <option value="sbi">State Bank of India</option>
                                            <option value="hdfc">HDFC Bank</option>
                                            <option value="icici">ICICI Bank</option>
                                            <option value="axis">Axis Bank</option>
                                        </TextField>
                                    </Box>
                                )}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    disabled={isProcessing || totalPrice === 0}
                                    sx={{ mt: 4, py: 1.5, fontSize: "1.1rem", fontWeight: "bold", borderRadius: 2 }}
                                >
                                    {isProcessing ? "Processing..." : `Pay ₹${totalPrice.toFixed(2)} `}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Order Summary Section */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: 2, position: "sticky", top: 20 }}>
                        <CardContent sx={{ p: 4, bgcolor: "grey.50" }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                                Order Summary
                            </Typography>

                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography color="text.secondary">Item Total</Typography>
                                <Typography sx={{ fontWeight: 500 }}>₹{totalPrice.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography color="text.secondary">Taxes & Charges</Typography>
                                <Typography sx={{ fontWeight: 500 }}>₹0.00</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography color="text.secondary">Shipping</Typography>
                                <Typography sx={{ fontWeight: 500, color: "success.main" }}>Free</Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Total Amount</Typography>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
                                    ₹{totalPrice.toFixed(2)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Snackbar open={success} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert severity="success" sx={{ width: "100%", fontSize: "1.1rem" }}>
                    Payment Successful! Order Confirmed.
                </Alert>
            </Snackbar>
        </Container>
    );
}

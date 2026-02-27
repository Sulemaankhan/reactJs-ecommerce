import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } =
    useCart();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!items.length) return;
    setPlacingOrder(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      clearCart();
      setOrderPlaced(true);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          {items.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            items.map((item) => (
              <Card
                key={item.id}
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">
                    {item.name || item.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹{Number(item.price || 0).toFixed(2)} each
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <TextField
                      type="number"
                      label="Qty"
                      size="small"
                      value={item.quantity}
                      inputProps={{ min: 1, style: { width: 60 } }}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      }
                      sx={{ mr: 2 }}
                    />
                    <Typography sx={{ fontWeight: 600 }}>
                      Subtotal: ₹
                      {(Number(item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
                <Box sx={{ pr: 2 }}>
                  <IconButton
                    color="error"
                    aria-label="remove item"
                    onClick={() => removeItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            ))
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Order Summary
              </Typography>
              <Typography variant="body2">
                Items: <strong>{totalItems}</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Total: <strong>₹{totalPrice.toFixed(2)}</strong>
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                disabled={!items.length}
                onClick={clearCart}
                sx={{ mt: 1 }}
              >
                Clear cart
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Checkout
              </Typography>
              <TextField
                label="Full name"
                name="name"
                value={customer.name}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Shipping address"
                name="address"
                value={customer.address}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!items.length || placingOrder}
                onClick={handlePlaceOrder}
              >
                {placingOrder ? "Placing order..." : "Place order"}
              </Button>
              {orderPlaced && (
                <Typography sx={{ mt: 2 }} color="success.main">
                  Order placed successfully! (demo only)
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}


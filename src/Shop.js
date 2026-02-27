import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getAllProducts } from "./products/services/Services";
import { useCart } from "./CartContext";
import { useSearch } from "./SearchContext";

export default function Shop() {
  const { addItem } = useCart();
  const { term } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        setError("Unable to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    addItem(
      {
        id: product.id,
        name: product.productName || product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        description: product.description,
      },
      1
    );
  };

  const filteredProducts = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      (p.productName || p.name || "").toLowerCase().includes(q)
    );
  }, [products, term]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Box
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <Box
          component="img"
          src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Shopping banner"
          sx={{ width: "100%", maxHeight: 260, objectFit: "cover" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Featured Products
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
              }}
            >
              {product.imageUrl ? (
                <CardMedia
                  component="img"
                  height="180"
                  image={product.imageUrl}
                  alt={product.productName || product.name}
                />
              ) : (
                <Box
                  sx={{
                    height: 180,
                    background:
                      "linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                  }}
                >
                  <Typography variant="subtitle2">No image</Typography>
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  noWrap
                >
                  {product.productName || product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                  noWrap
                >
                  {product.description || "Stylish and comfortable product."}
                </Typography>
                <Typography variant="h6" color="primary">
                  ₹{Number(product.price || 0).toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                >
                  View details
                </Button>
                <IconButton
                  color="primary"
                  aria-label="add to cart"
                  onClick={() => handleAddToCart(product)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {products.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography>No products available.</Typography>
        </Box>
      )}
      {products.length > 0 && filteredProducts.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography>No products match that name.</Typography>
        </Box>
      )}
    </Container>
  );
}


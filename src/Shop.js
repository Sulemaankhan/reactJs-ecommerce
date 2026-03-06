import React, { useEffect, useMemo, useRef, useState } from "react";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getProductsPage } from "./products/services/Services";
import { useCart } from "./CartContext";
import { useSearch } from "./SearchContext";

export default function Shop() {
  const { addItem } = useCart();
  const { term } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const cacheRef = useRef(new Map());

  useEffect(() => {
    const key = JSON.stringify({
      page,
      size: pageSize,
      search: term,
      category,
      sortBy,
      sortDir,
    });

    const cached = cacheRef.current.get(key);
    if (cached) {
      setProducts(cached.content);
      setTotalPages(cached.totalPages || 1);
      setLoading(false);
      return;
    }

    setLoading(true);
    getProductsPage({
      page: page - 1,
      size: pageSize,
      search: term,
      category,
      sortBy,
      sortDir,
    })
      .then((data) => {
        const content = Array.isArray(data.content) ? data.content : [];
        setProducts(content);
        setTotalPages(data.totalPages || 1);
        cacheRef.current.set(key, {
          content,
          totalPages: data.totalPages || 1,
        });
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        setError("Unable to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, term, category, sortBy, sortDir]);

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
    // backend already filters/searches; keep hook in case of client-side extras
    return products;
  }, [products]);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Featured Products
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              label="Category"
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Western">Western</MenuItem>
              <MenuItem value="Accesseries">Accessories</MenuItem>
              <MenuItem value="Footbear">Footwear</MenuItem>
              <MenuItem value="Tredentional">Traditional</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="sort-label">Sort</InputLabel>
            <Select
              labelId="sort-label"
              label="Sort"
              value={`${sortBy}:${sortDir}`}
              onChange={(e) => {
                const [sb, sd] = e.target.value.split(":");
                setSortBy(sb);
                setSortDir(sd);
              }}
            >
              <MenuItem value="id:asc">Newest</MenuItem>
              <MenuItem value="price:asc">Price: Low to High</MenuItem>
              <MenuItem value="price:desc">Price: High to Low</MenuItem>
              <MenuItem value="productName:asc">Name: A-Z</MenuItem>
              <MenuItem value="productName:desc">Name: Z-A</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
      {products.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}


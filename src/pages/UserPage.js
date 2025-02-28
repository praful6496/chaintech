import React, { useState } from "react";
import {
  Typography, Box, Container, Grid, Card, CardContent, CardMedia,
  MenuItem, Select, FormControl, InputLabel, Button, Dialog,
  DialogContent, DialogTitle, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const UserPage = () => {
  const products = useSelector((state) => state.products.products);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = filterCategory
    ? products.filter((product) => product.category === filterCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    if (sortOption === "nameAsc") return a.name.localeCompare(b.name);
    if (sortOption === "nameDesc") return b.name.localeCompare(a.name);
    return 0;
  });

  const handleCategoryChange = (event) => setFilterCategory(event.target.value);
  const handleSortChange = (event) => setSortOption(event.target.value);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container>
      <Box p={2}>
        <Grid container alignItems="center" justifyContent="space-between" mb={2}>
          <Grid item xs={12} sm={4} md={4} sx={{ textAlign: 'left' }}>
            <Typography variant="h4" fontWeight={600}>
              All Products
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8} md={8}>
            <Grid container spacing={3} justifyContent={"end"}>
              <Grid item xs={6} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filterCategory}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Furniture">Furniture</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select value={sortOption} onChange={handleSortChange} label="Sort By">
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
                    <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
                    <MenuItem value="nameAsc">Name (A to Z)</MenuItem>
                    <MenuItem value="nameDesc">Name (Z to A)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {sortedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    image="https://placehold.co/300"
                    alt={product.name}
                  />
                  <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock Quantity: {product.stockQuantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created By: {product.createdBy}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewDetails(product)}
                    sx={{ mt: 2, borderColor:"black", color:"black" }}
                  >
                    View Details
                  </Button>
                </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={open}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        sx={{ "& .MuiDialog-paper": { width: "80%", maxWidth: "500px", overflow: "hidden" } }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogTitle>
            {selectedProduct?.name}
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
              sx={{
                marginRight:0,
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ padding: "16px" }}>
          <Typography variant="body1">
            <strong>Category:</strong> {selectedProduct?.category}
          </Typography>
          <Typography variant="body1">
            <strong>Price:</strong> ${selectedProduct?.price}
          </Typography>
          <Typography variant="body1">
            <strong>Stock Quantity:</strong> {selectedProduct?.stockQuantity}
          </Typography>
          <Typography variant="body1">
            <strong>Created By:</strong> {selectedProduct?.createdBy}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {selectedProduct?.description || "No description available."}
          </Typography>
          <CardMedia
            component="img"
            image={selectedProduct?.imageUrl || "https://placehold.co/200"}
            alt="Product Image"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        </motion.div>
      </Dialog>
    </Container>
  );
};

export default UserPage;

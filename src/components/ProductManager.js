import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct, deleteProduct } from "../store/productSlice";
import { motion, AnimatePresence } from "framer-motion";

const ProductManager = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stockQuantity: "",
    createdBy: "",
  });
  const [error, setError] = useState("");
  const [filterName, setFilterName] = useState("");  
  const [sortOption, setSortOption] = useState(""); 
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProduct) {
      setFormData({ ...selectedProduct });
    } else {
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        stockQuantity: "",
        createdBy: "",
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.description ||
      !formData.stockQuantity ||
      !formData.createdBy
    ) {
      setError("All fields are required.");
      return;
    }

    setError("");

    if (selectedProduct) {
      dispatch(editProduct(formData));
    } else {
      dispatch(
        addProduct({
          ...formData,
          id: Date.now().toString(),
          lastModified: new Date(),
        })
      );
    }
    setSelectedProduct(null);
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      stockQuantity: "",
      createdBy: "",
    });
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  // Filter products by name
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterName.toLowerCase())
  );

  // Sort products by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceAsc") {
      return a.price - b.price;
    } else if (sortOption === "priceDesc") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box mb={2} width="400px" textAlign="center">
          {error && (
            <Typography color="error" variant="body2" mb={2}>
              {error}
            </Typography>
          )}
          <TextField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
            required
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Stock Quantity"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
            required
          />
          <TextField
            label="Created By"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ backgroundColor: "black" }}
          >
            {selectedProduct ? "Save Changes" : "Add Product"}
          </Button>
        </Box>
      </Box>
      {sortedProducts.length > 0 && (
      <Box mb={3}>
        <Grid container spacing={2}>
          {/* Filter by Product Name */}
          <Grid item xs={12} sm={8}>
            <TextField
              label="Filter by Product Name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>

          {/* Sort by Price */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Sort By Price</InputLabel>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
                <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>)}

      {/* Display filtered and sorted products */}
      <Grid container spacing={2}>
        {sortedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
          <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
            <Box border={1} p={2} borderRadius="8px">
              <Typography variant="body1">
                <strong>{product.name}</strong>
              </Typography>
              <Typography variant="body2">Price: ${product.price}</Typography>
              <Typography variant="body2">
                Category: {product.category}
              </Typography>
              <Typography variant="body2">
                Description: {product.description}
              </Typography>
              <Typography variant="body2">
                Stock Quantity: {product.stockQuantity}
              </Typography>
              <Typography variant="body2">
                Created By: {product.createdBy}
              </Typography>
              <Typography variant="body2">
                Last Modified:{" "}
                {new Date(product.lastModified).toLocaleString()}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(product)}
                style={{ marginRight: "10px" }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </Box>
            </motion.div>
            </AnimatePresence>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductManager;

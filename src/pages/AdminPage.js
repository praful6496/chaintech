import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ProductManager from "../components/ProductManager";

const AdminPage = () => {
  return (
    <Container>
      <Box p={2}>
        <Typography variant="h4" textAlign={"center"} fontWeight={700}>Admin Dashboard</Typography>
        <ProductManager />
      </Box>
    </Container>
  );
};

export default AdminPage;

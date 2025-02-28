// Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const { user, setUser, logout } = useAuth(); // Add setUser here
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black", height: "64px", zIndex: 1300 }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Product Management System
          </Typography>
          {user && (
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: "white", color: "black", marginRight: "10px" }}>
                {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase()}
              </Avatar>
              <Button sx={{ color: "white" }} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
